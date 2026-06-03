import os

files_to_scan = []

# Scan src
for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith((".jsx", ".js", ".css")):
            files_to_scan.append(os.path.join(root, file))

# Scan backend
for root, dirs, files in os.walk("backend"):
    for file in files:
        if file.endswith((".js", ".json")):
            files_to_scan.append(os.path.join(root, file))

# Scan python_modules
for root, dirs, files in os.walk("python_modules"):
    for file in files:
        if file.endswith((".py", ".txt")):
            files_to_scan.append(os.path.join(root, file))

# Other files
for file in ["index.html", "package.json", "tailwind.config.js", "README.md"]:
    if os.path.exists(file):
        files_to_scan.append(file)

matches = []
for filepath in files_to_scan:
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        lower_content = content.lower()
        if "finaquity" in lower_content or "address" in lower_content or "plot" in lower_content or "road" in lower_content or "sector" in lower_content:
            matches.append(filepath)
    except Exception as e:
        pass

with open("matches.txt", "w", encoding="utf-8") as f:
    f.write(f"Scanning {len(files_to_scan)} files...\n")
    for filepath in matches:
        f.write(f"Match: {filepath}\n")
    f.write("Done!\n")
print("Done writing matches!")
