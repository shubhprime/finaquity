import os

# Define files to update
files_to_update = [
    # Core pages & components
    "src/components/Footer.jsx",
    "src/components/Navbar.jsx",
    "src/pages/Home.jsx",
    "src/pages/Club.jsx",
    "src/pages/Dashboard.jsx",
    "src/pages/Success.jsx",
    "src/pages/LoginSignup.jsx",
    "src/pages/MarketAnalysis.jsx",
    "src/pages/TradeIdeas.jsx",
    "src/pages/AlgoTrade.jsx",
    "src/pages/Screener.jsx",
    # Config & other layers
    "index.html",
    "package.json",
    "README.md",
    "backend/server.js",
    "python_modules/telegram_bot.py"
]

replacements = [
    ("FinEquity", "Greenmarket"),
    ("Finaquity", "Greenmarket"),
    ("finaquity", "greenmarket"),
    ("FINEQUITY", "GREENMARKET"),
    # Replace logo initial in Navbar
    ('text-black text-sm">F</span>', 'text-black text-sm">G</span>')
]

updated_count = 0

for file_path in files_to_update:
    if not os.path.exists(file_path):
        print(f"Skipping (does not exist): {file_path}")
        continue
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        original_content = content
        for old_str, new_str in replacements:
            content = content.replace(old_str, new_str)
            
        if content != original_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Successfully updated: {file_path}")
            updated_count += 1
        else:
            print(f"No replacements needed in: {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"Done! Updated {updated_count} files.")
