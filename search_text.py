import os

search_terms = ["address", "finaquity", "road", "sector", "noida", "gurgaon", "delhi"]

exclude_dirs = ["node_modules", "dist", ".git", ".system_generated", "brain"]
exclude_extensions = [".png", ".jpg", ".jpeg", ".gif", ".ico", ".pdf", ".zip", ".tar", ".gz"]

matches = []

for root, dirs, files in os.walk("."):
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    for file in files:
        if any(file.endswith(ext) for ext in exclude_extensions):
            continue
        file_path = os.path.join(root, file)
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                lines = f.readlines()
                for line_idx, line in enumerate(lines):
                    for term in search_terms:
                        if term.lower() in line.lower():
                            matches.append({
                                "file": file_path,
                                "line": line_idx + 1,
                                "term": term,
                                "content": line.strip()
                            })
        except Exception as e:
            pass

print(f"Found {len(matches)} matches:")
for match in matches[:50]:
    print(f"{match['file']}:{match['line']} (found '{match['term']}'): {match['content']}")

if len(matches) > 50:
    print(f"... and {len(matches) - 50} more matches.")
