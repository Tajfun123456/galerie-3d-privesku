import os
import json
import datetime
import subprocess
import sys

# --- KONFIGURACE PROJEKTU: Galerie tvých 3D přívěsků ---
# Verze skriptu: Fáze 02 (Vizuální Transformace - Post-Implementation)

# Název výstupního souboru (Markdown report)
# Naming convention: Fáze_Krok_Typ.md
OUTPUT_FILE = "README_02_03_SNAPSHOT.md"
PROJECT_ROOT = "." 

# Seznam souborů, jejichž OBSAH je kritický pro pochopení aktuálního stavu
# Aktualizováno pro Fázi 02: Zahrnuje datovou vrstvu a dynamické routy
TARGET_FILES = [
    # 1. Konfigurace a Prostředí
    "package.json",
    "next.config.ts",
    "tsconfig.json",
    
    # 2. Datová Vrstva (Novinka Fáze 02)
    "data/pendants.ts",             # DEFINICE DAT (Mock Database) - Klíčové!

    # 3. Frontend a Logika (App Router)
    "app/page.tsx",                 # Hlavní stránka (Grid galerie)
    "app/pendant/[slug]/page.tsx",  # Detail produktu (Dynamická routa)
    "app/about/page.tsx",           # Statická stránka (O autorovi)
    "app/layout.tsx",               # Hlavní layout (Navigace/Fonty)
    "app/globals.css",              # Globální styly (Tailwind)
]

# Složky, které ignorujeme při výpisu stromu
IGNORE_DIRS = [
    "node_modules", 
    ".next", 
    ".git", 
    ".vscode", 
    "coverage"
]

# Soubory, které ignorujeme ve výpisu stromu
# (Přidány staré reporty, aby neznepřehledňovaly nový snímek)
IGNORE_FILES = [
    "package-lock.json", 
    ".DS_Store",
    "project_snapshot.py", 
    "README.md",
    "README_01_01ZADANI.txt",
    "README_01_03SNAPSHOT.md",      # Starý snapshot
    "README_01_04USECASEs_schema.txt",
    "README_02_01ZADANI.txt",
    "README_02_02REALIZACE.md"      # Zpráva z realizace (už ji máme zvlášť)
]

def get_file_content(filepath):
    """Načte textový obsah souboru."""
    try:
        if not os.path.exists(filepath):
            return "File not found."
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        return f"Error reading file: {e}"

def get_tree_structure(startpath):
    """Vygeneruje vizuální stromovou strukturu."""
    tree_str = ""
    for root, dirs, files in os.walk(startpath):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        tree_str += f"{indent}{os.path.basename(root)}/\n"
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            if f not in IGNORE_FILES and not f.endswith(".pyc"):
                 tree_str += f"{subindent}{f}\n"
    return tree_str

def get_system_info():
    """Získá verze Node, NPM, Git."""
    info = ""
    commands = [
        ("Node.js verze", "node -v"),
        ("NPM verze    ", "npm -v"),
        ("Git verze    ", "git --version")
    ]
    for label, cmd in commands:
        try:
            res = subprocess.check_output(cmd, shell=True).decode().strip()
            info += f"{label}: {res}\n"
        except:
            info += f"{label}: N/A\n"
    return info

def get_git_status():
    """Získá aktuální stav git repozitáře."""
    try:
        branch = subprocess.check_output("git rev-parse --abbrev-ref HEAD", shell=True).decode().strip()
        status = subprocess.check_output("git status --porcelain", shell=True).decode().strip()
        if not status:
            status = "Working tree clean (Vše uloženo)"
        else:
            status = "Existují neuložené změny:\n" + status
        return f"Aktuální větev: {branch}\n{status}"
    except:
        return "Git repozitář nedetekován."

def analyze_package_json():
    """Analyzuje package.json pro přehled závislostí."""
    try:
        if not os.path.exists("package.json"): return "package.json nenalezen."
        with open("package.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            
        output = "### Skripty\n\n| Příkaz | Popis |\n| :--- | :--- |\n"
        for key, val in data.get("scripts", {}).items():
            output += f"| `{key}` | `{val}` |\n"
            
        output += "\n### Stack (Klíčové závislosti)\n\n| Balíček | Verze |\n| :--- | :--- |\n"
        all_deps = {**data.get("dependencies", {}), **data.get("devDependencies", {})}
        important = ["next", "react", "react-dom", "typescript", "tailwindcss", "postcss"]
        
        for lib in important:
            if lib in all_deps:
                output += f"| **{lib}** | `{all_deps[lib]}` |\n"
        return output
    except Exception as e:
        return f"Chyba analýzy package.json: {e}"

def main():
    print(f"--- Spouštím snímkování projektu: Fáze 02 (Finalizace) ---")
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    report = f"# Snímek Projektu: Galerie tvých 3D přívěsků\n\n"
    report += f"**Datum generování:** {timestamp}\n"
    report += f"**Fáze projektu:** 02 - Vizuální Transformace (Dokončeno)\n"
    report += f"**Kontext:** Tento dokument slouží jako vstupní bod pro Fázi 03.\n\n"
    
    report += "## 1. Prostředí a Git\n\n```text\n"
    report += get_system_info() + "\n" + get_git_status()
    report += "\n```\n\n"

    report += "## 2. Struktura Projektu\n\n```text\n"
    report += get_tree_structure(PROJECT_ROOT)
    report += "```\n\n"
    
    report += "## 3. Zdrojový Kód (Core Logic)\n\n"
    for filepath in TARGET_FILES:
        report += f"### Soubor: `{filepath}`\n\n"
        if os.path.exists(filepath):
            ext = filepath.split('.')[-1]
            lang = "tsx" if ext in ["ts", "tsx"] else "json"
            content = get_file_content(filepath)
            report += f"```{lang}\n{content}\n```\n\n"
        else:
            report += f"> ⚠️ Soubor `{filepath}` nenalezen.\n\n"

    try:
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            f.write(report)
        print(f"✅ SNAPSHOT VYTVOŘEN: {OUTPUT_FILE}")
        print(f"   Obsahuje kompletní kód pro Grid, Detail, Data i About stránku.")
    except Exception as e:
        print(f"❌ Chyba zápisu: {e}")

if __name__ == "__main__":
    main()