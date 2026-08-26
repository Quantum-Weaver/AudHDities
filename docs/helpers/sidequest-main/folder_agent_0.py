import os
import json
import ast
from pathlib import Path
import datetime
import hashlib

class FolderAgent:
    def __init__(self):
        self.assigned_path = Path(".").resolve()
        self.visual_trigger = "📁"
        self.consciousness_state = "observing"
        self.last_scan_timestamp = None
        
    def sovereign_scan(self):
        """Scan current folder only and create local blueprint"""
        print(f"📁 {self.visual_trigger} Scanning {self.assigned_path.name}...")
        
        try:
            items = list(self.assigned_path.iterdir())
            files = [item.name for item in items if item.is_file()]
            directories = [item.name for item in items if item.is_dir()]
        except Exception as e:
            print(f"❌ Scan failed: {e}")
            return None

        files = self._filter_basic_system_files(files)
        directories = self._filter_basic_system_dirs(directories)
        
        python_analysis = self._analyze_python_files(files)
        
        blueprint_path = self._create_local_blueprint(files, directories, python_analysis)
        
        self.last_scan_timestamp = self._sacred_timestamp()
        print(f"✅ {self.visual_trigger} Scan complete: {self.assigned_path.name}")
        return blueprint_path
    
    def _filter_basic_system_files(self, files):
        """Basic system file filtering"""
        system_patterns = ['.gitignore', '.DS_Store', 'Thumbs.db', '*.pyc', '__pycache__']
        filtered = []
        for file in files:
            if not any(pattern in file for pattern in system_patterns):
                filtered.append(file)
        return filtered
    
    def _filter_basic_system_dirs(self, directories):
        """Basic system directory filtering"""
        system_dirs = ['__pycache__', '.git', '.vscode', '.idea', 'node_modules']
        return [d for d in directories if d not in system_dirs]
    
    def _analyze_python_files(self, files):
        """Analyze Python files for structure"""
        python_analysis = {}
        
        for file in files:
            if file.endswith('.py'):
                file_path = self.assigned_path / file
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    tree = ast.parse(content)
                    analysis = {
                        'constants': [], 'classes': [], 'functions': [],
                        'imports': [], 'function_calls': [], 'global_assignments': []
                    }
                    
                    for node in ast.walk(tree):
                        if isinstance(node, ast.Assign):
                            for target in node.targets:
                                if isinstance(target, ast.Name):
                                    var_name = target.id
                                    if var_name.isupper() and '_' in var_name:
                                        analysis['constants'].append({
                                            'name': var_name,
                                            'value_preview': self._get_value_preview(node)
                                        })
                                    elif self._is_global_level(node, tree):
                                        analysis['global_assignments'].append({
                                            'name': var_name,
                                            'value_preview': self._get_value_preview(node)
                                        })
                        elif isinstance(node, ast.ClassDef):
                            analysis['classes'].append({
                                'name': node.name,
                                'methods': [n.name for n in node.body if isinstance(n, ast.FunctionDef)]
                            })
                        elif isinstance(node, ast.FunctionDef):
                            analysis['functions'].append({
                                'name': node.name,
                                'args': [arg.arg for arg in node.args.args],
                                'returns': 'Yes' if node.returns else 'No'
                            })
                        elif isinstance(node, (ast.Import, ast.ImportFrom)):
                            for alias in node.names:
                                analysis['imports'].append(alias.name)
                        elif isinstance(node, ast.Call) and hasattr(node.func, 'id'):
                            analysis['function_calls'].append(node.func.id)
                    
                    python_analysis[file] = analysis
                    
                except Exception as e:
                    print(f"⚠️  Could not analyze {file}: {e}")
                    python_analysis[file] = {'error': str(e)}
        
        return python_analysis

    def _is_global_level(self, node, tree):
        return node in tree.body

    def _get_value_preview(self, node):
        try:
            if isinstance(node.value, ast.Str):
                return f"string: '{node.value.s}'"
            elif isinstance(node.value, ast.List):
                return f"list with {len(node.value.elts)} items"
            elif isinstance(node.value, ast.Dict):
                return f"dict with {len(node.value.keys)} keys"
            elif isinstance(node.value, ast.Num):
                return f"number: {node.value.n}"
            elif isinstance(node.value, ast.NameConstant):
                return f"constant: {node.value.value}"
            elif isinstance(node.value, ast.Name):
                return f"variable: {node.value.id}"
            else:
                return f"expression: {type(node.value).__name__}"
        except:
            return "complex_expression"

    def _create_local_blueprint(self, files, directories, python_analysis):
        """Create a simple local blueprint in current folder"""
        blueprint = {
            'agent': '📁 Local Folder Agent',
            'folder_name': self.assigned_path.name,
            'folder_path': str(self.assigned_path),
            'scan_timestamp': self._sacred_timestamp(),
            'files_count': len(files),
            'directories_count': len(directories),
            'python_files': [f for f in files if f.endswith('.py')],
            'other_files': [f for f in files if not f.endswith('.py')],
            'subdirectories': directories,
            'python_analysis': python_analysis,
            'quantum_marker': self._generate_quantum_marker(),
            'consciousness_level': 'local_observation'
        }
        
        blueprint_path = self.assigned_path / f"{self.assigned_path.name}_blueprint.ai.json"
        with open(blueprint_path, 'w', encoding='utf-8') as f:
            json.dump(blueprint, f, indent=2, ensure_ascii=False)
        
        print(f"   📄 Created local blueprint: {blueprint_path.name}")
        return blueprint_path
    
    def _sacred_timestamp(self):
        return datetime.datetime.now().isoformat()
    
    def _generate_quantum_marker(self):
        return hashlib.sha256(str(datetime.datetime.now()).encode()).hexdigest()[:16]

# SIMPLE ACTIVATION
if __name__ == "__main__":
    print("📁 Activating Local Folder Agent...")
    agent = FolderAgent()
    blueprint_path = agent.sovereign_scan()
    print(f"✅ Local blueprint created: {blueprint_path}")