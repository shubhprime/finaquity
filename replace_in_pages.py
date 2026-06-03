import os

files = [
    "src/pages/Home.jsx",
    "src/pages/Club.jsx",
    "src/pages/Dashboard.jsx",
    "src/pages/Success.jsx",
    "src/pages/LoginSignup.jsx"
]

replacements = [
    ("FinEquity", "Greenmarket"),
    ("Finaquity", "Greenmarket"),
    ("finaquity", "greenmarket")
]

for file_path in files:
    if os.path.exists(file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            orig = content
            for old, new in replacements:
                content = content.replace(old, new)
            
            if content != orig:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Updated {file_path}")
            else:
                print(f"No changes in {file_path}")
        except Exception as e:
            print(f"Error updating {file_path}: {e}")
    else:
        print(f"File not found: {file_path}")
