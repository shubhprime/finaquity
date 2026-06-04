import os
import time
import requests
import psycopg2
import threading
from dotenv import load_dotenv
from flask import Flask

# Load environment variables
load_dotenv()

DB_URL = os.getenv("DATABASE_URL")
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHANNEL_ID = os.getenv("TELEGRAM_CHANNEL_ID")

def init_db_posted_column():
    try:
        conn = psycopg2.connect(DB_URL)
        cursor = conn.cursor()
        # Add is_posted column to database if it does not exist
        cursor.execute("""
            ALTER TABLE stock_reports 
            ADD COLUMN IF NOT EXISTS is_posted BOOLEAN DEFAULT FALSE;
        """)
        conn.commit()
        cursor.close()
        conn.close()
        print("Verified is_posted column exists in PostgreSQL database.")
    except Exception as e:
        print("Error checking is_posted column: ", e)

def post_to_telegram(message):
    if not BOT_TOKEN or not CHANNEL_ID:
        print("Skipping Telegram send: TELEGRAM_BOT_TOKEN or TELEGRAM_CHANNEL_ID not set in env.")
        return False
        
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": CHANNEL_ID,
        "text": message,
        "parse_mode": "Markdown"
    }
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("Message sent to Telegram channel successfully!")
            return True
        else:
            print(f"Telegram posting error: {response.text}")
            return False
    except Exception as e:
        print("Failed to contact Telegram API: ", e)
        return False

def check_and_post_alerts():
    if not DB_URL:
        print("DATABASE_URL not configured. Skipping check.")
        return
        
    try:
        conn = psycopg2.connect(DB_URL)
        cursor = conn.cursor()
        
        # Select unposted trade signals
        cursor.execute("""
            SELECT id, symbol, type, entry, target, stop_loss, note 
            FROM stock_reports 
            WHERE is_posted = FALSE 
            ORDER BY id ASC;
        """)
        rows = cursor.fetchall()
        
        if not rows:
            print("No new stock reports to post.")
            cursor.close()
            conn.close()
            return
            
        for row in rows:
            trade_id, symbol, trade_type, entry, target, stop_loss, note = row
            
            # Format custom template alert
            message = (
                f"🚨 *NEW STOCK BRIEFING* 🚨\n\n"
                f"📈 *Stock*: {symbol}\n"
                f"⚡ *Call Type*: {trade_type}\n"
                f"💰 *Entry Range*: {entry}\n"
                f"🎯 *Target*: {target}\n"
                f"🛑 *Stop Loss*: {stop_loss}\n\n"
                f"📝 *Research Note*: {note}\n\n"
                f"💬 _Advisory calls validated by SEBI-registered experts._"
            )
            
            # Send message to Telegram Channel
            if post_to_telegram(message):
                cursor.execute("UPDATE stock_reports SET is_posted = TRUE WHERE id = %s;", (trade_id,))
                conn.commit()
                print(f"Marked trade ID {trade_id} ({symbol}) as posted in db.")
                
        cursor.close()
        conn.close()
    except Exception as e:
        print("Error in check_and_post_alerts execution: ", e)

# Initialize Flask application
app = Flask(__name__)

@app.route('/')
@app.route('/health')
def health_check():
    return {"status": "healthy", "message": "Greenmarket Telegram bot is running"}, 200

@app.route('/check')
def trigger_check():
    try:
        check_and_post_alerts()
        return {"status": "success", "message": "Checked database and posted any new alerts to Telegram"}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

def run_scheduler():
    init_db_posted_column()
    print("Greenmarket Telegram automated bot scheduler thread started.")
    
    # Run immediate check
    check_and_post_alerts()
    
    # Check every 3 hours (10800 seconds)
    INTERVAL_SECONDS = 3 * 3600
    while True:
        time.sleep(INTERVAL_SECONDS)
        check_and_post_alerts()

# Start the scheduler checking loop inside a background daemon thread
scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
scheduler_thread.start()

if __name__ == "__main__":
    # Start the Flask web application locally on the specified PORT environment variable (default 5000)
    port = int(os.getenv("PORT", 5000))
    print(f"Starting Flask server on port {port}...")
    app.run(host="0.0.0.0", port=port)
