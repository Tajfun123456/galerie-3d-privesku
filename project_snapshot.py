import os
import json
import datetime
import subprocess
import sys

# --- KONFIGURACE PROJEKTU: Galerie tvých 3D přívěsků ---
# Verze skriptu: Fáze 01 (Initial Kick-off)

# Název výstupního souboru (Markdown report)
OUTPUT_FILE = "README_01_03_SNAPSHOT.md"
PROJECT_ROOT = "." 

# Seznam souborů, jejichž OBSAH chceme v reportu vidět
# Zde vybíráme jen to nejdůležitější pro aktuální fázi
TARGET_FILES = [
    # 1. Konfigurace projektu a prostředí
    "package.json",
    "next.config.ts",
    "tsconfig.json",
    "postcss.config.mjs",
    "eslint.config.mjs",
    ".gitignore",
    
    # 2. Zdrojový kód aplikace (App Router)
    "app/page.tsx",         # Hlavní stránka (upravená v Fázi 01)
    "app/layout.tsx",       # Hlavní layout aplikace
    "app/globals.css",      # Globální styly (Tailwind)
]

# Složky, které chceme IGNOROVAT při výpisu stromové struktury
# (aby report nebyl zaplevelený tisíci soubory z knihoven)
IGNORE_DIRS = [
    "node_modules", 
    ".next", 
    ".git", 
    ".vscode", 
    "coverage"
]

# Soubory, které chceme ignorovat ve výpisu stromu
IGNORE_FILES = [
    "package-lock.json", # Příliš dlouhý, stačí package.json
    ".DS_Store",
    "project_snapshot.py", # Samotný skript
    "README.md",
    "README_01_01ZADANI.txt",
    "REALIZACNI_PLAN.md",
    "ZAVERECNA_ZPRAVA_FAZE_01.md"
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
    """Vygeneruje vizuální stromovou strukturu adresářů a souborů."""
    tree_str = ""
    for root, dirs, files in os.walk(startpath):
        # Filtrace ignorovaných složek
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
    """Získá informace o verzích nainstalovaných nástrojů (Node, NPM, Git)."""
    info = ""
    # Node.js
    try:
        # Používáme shell=True pro Windows, aby našel příkazy v PATH
        node_ver = subprocess.check_output("node -v", shell=True).decode().strip()
        info += f"Node.js verze: {node_ver}\n"
    except:
        info += "Node.js: N/A (nepodařilo se zjistit)\n"
        
    # NPM
    try:
        npm_ver = subprocess.check_output("npm -v", shell=True).decode().strip()
        info += f"NPM verze:     {npm_ver}\n"
    except:
        info += "NPM: N/A\n"

    # Git
    try:
        git_ver = subprocess.check_output("git --version", shell=True).decode().strip()
        info += f"Git verze:     {git_ver}\n"
    except:
        info += "Git: N/A\n"
        
    return info

def get_git_status():
    """Získá aktuální stav git repozitáře (větev a změny)."""
    try:
        branch = subprocess.check_output("git rev-parse --abbrev-ref HEAD", shell=True).decode().strip()
        # Získáme status (pokud je prázdný, je čisto)
        status = subprocess.check_output("git status --porcelain", shell=True).decode().strip()
        if not status:
            status = "Working tree clean (žádné neuložené změny)"
        else:
            status = "Existují neuložené změny:\n" + status
        return f"Aktuální větev: {branch}\n{status}"
    except:
        return "Git repozitář nebyl detekován nebo došlo k chybě."

def analyze_package_json():
    """Analyzuje package.json a vypíše klíčové technologie."""
    try:
        if not os.path.exists("package.json"):
            return "package.json nenalezen."

        with open("package.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            
        scripts = data.get("scripts", {})
        dependencies = data.get("dependencies", {})
        devDependencies = data.get("devDependencies", {})
        
        output = "### Dostupné Skripty (npm run ...)\n\n"
        output += "| Příkaz | Popis |\n| :--- | :--- |\n"
        for key, val in scripts.items():
            output += f"| `{key}` | `{val}` |\n"
            
        output += "\n### Detekované Technologie (Stack)\n\n"
        output += "| Balíček | Verze | Typ |\n| :--- | :--- | :--- |\n"
        
        # Klíčové knihovny, které nás zajímají v této fázi
        important_libs = [
            "next", "react", "react-dom", "typescript", 
            "tailwindcss", "postcss", "eslint", "clsx", "lucide-react"
        ]

        all_deps = {**dependencies, **devDependencies}
        
        # Nejprve vypíšeme ty důležité
        for lib in important_libs:
            if lib in all_deps:
                type_dep = "Dependency" if lib in dependencies else "DevDependency"
                output += f"| **{lib}** | `{all_deps[lib]}` | {type_dep} |\n"
        
        # Pak zbytek (volitelně, abychom to nezahltili)
        for lib, ver in all_deps.items():
            if lib not in important_libs:
                type_dep = "Dependency" if lib in dependencies else "DevDependency"
                output += f"| {lib} | `{ver}` | {type_dep} |\n"

        return output
    except Exception as e:
        return f"Error analyzing package.json: {e}"

def main():
    print(f"--- Spouštím snímkování projektu: Galerie tvých 3D přívěsků ---")
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Hlavička reportu
    report = f"# Snímek Projektu: Galerie tvých 3D přívěsků\n\n"
    report += f"**Datum generování:** {timestamp}\n"
    report += f"**Fáze projektu:** 01 (Počáteční výkop a příprava)\n"
    report += f"**Autor skriptu:** project_snapshot.py\n\n"
    
    report += "## 1. Systémové a Vývojové Prostředí\n\n"
    report += "Tento oddíl potvrzuje verze nástrojů v okamžiku snímkování.\n\n"
    report += "```text\n"
    report += get_system_info()
    report += "```\n\n"
    
    report += "## 2. Stav Git Repozitáře\n\n"
    report += "```text\n"
    report += get_git_status()
    report += "\n```\n\n"

    report += "## 3. Analýza Závislostí (package.json)\n\n"
    report += analyze_package_json()
    report += "\n"

    report += "## 4. Struktura Adresáře\n\n"
    report += "Stromová struktura projektu (bez `node_modules` a `.next`):\n\n"
    report += "```text\n"
    report += get_tree_structure(PROJECT_ROOT)
    report += "```\n\n"
    
    report += "## 5. Obsah Klíčových Souborů\n\n"
    report += "Níže je uveden plný obsah souborů, které byly definovány jako klíčové pro tuto fázi.\n\n"
    
    for filepath in TARGET_FILES:
        report += f"### Soubor: `{filepath}`\n\n"
        if os.path.exists(filepath):
            # Určení jazyka pro markdown syntax highlighting
            ext = filepath.split('.')[-1]
            lang = "tsx" if ext in ["ts", "tsx"] else "json" if ext == "json" else "css" if ext == "css" else "text"
            
            content = get_file_content(filepath)
            report += f"```{lang}\n{content}\n```\n\n"
        else:
            report += f"> ⚠️ **UPOZORNĚNÍ:** Soubor `{filepath}` nebyl v projektu nalezen.\n\n"

    # Zápis do souboru
    try:
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            f.write(report)
        print(f"✅ HOTOVO! Snímek projektu byl úspěšně uložen do souboru:\n   -> {os.path.abspath(OUTPUT_FILE)}")
        print(f"   Tento soubor nyní můžete nahrát do chatu pro kontext v další fázi.")
    except Exception as e:
        print(f"❌ CHYBA při zápisu souboru: {e}")

if __name__ == "__main__":
    main()