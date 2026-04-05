## /quantum/library/index/naming-guide.md
# 📚 **REALITY NAMING CONVENTION GUIDE**

## 🎯 **QUICK DECISION FLOWCHART**

```
What are you naming?
│
├── 🐍 Python Files & Variables → snake_case
├── 🎨 CSS Classes & IDs → kebab-case  
├── 🗂️ URLs & API Endpoints → kebab-case
├── ⚡ TypeScript Variables → camelCase
├── 🏗️ TypeScript Classes → PascalCase
├── 🐳 Docker Services → kebab-case
├── 📁 Directories/Folders → kebab-case
├── 🌐 Environment Variables → SCREAMING_SNAKE_CASE
├── 🎪 Project/App Names → kebab-case
└── 🏗️ React Components → PascalCase
```

## 🔍 **DETAILED BREAKDOWN FOR REALITY ARCHITECTURE**

### **1. `kebab-case`**
**Use for:**
- ✅ **Directory names**: `reality/`, `quantum/ziggy/`
- ✅ **CSS classes**: `.audio-processing-tool`
- ✅ **HTML IDs**: `#cinematic-tool-container`
- ✅ **URLs/endpoints**: `/api/lyric-analysis`
- ✅ **Docker services**: `bifrost-app`
- ✅ **Project names**: `bifrost-weaver`

### **2. `snake_case`**
**Use for:**
- ✅ **Python files**: `definition_extractor.py`
- ✅ **Python variables**: `scan_results`
- ✅ **Python functions**: `extract_definitions()`
- ✅ **Python modules**: `ziggy.core`

### **3. `camelCase`**
**Use for:**
- ✅ **TypeScript variables**: `const lyricAnalysis = {}`
- ✅ **TypeScript functions**: `function processAudio()`
- ✅ **JSON properties**: `{"ziggyConfig": true}`

### **4. `PascalCase`**
**Use for:**
- ✅ **TypeScript/JavaScript classes**: `class QuantumAnalyzer {}`
- ✅ **React components**: `function BifrostBridge() {}`
- ✅ **Python classes**: `class DefinitionHarvester:`

### **5. `SCREAMING_SNAKE_CASE`**
**Use for:**
- ✅ **Environment variables**: `REALITY_API_KEY`
- ✅ **Constants**: `const MAX_QUANTUM_LEVEL = 100`
- ✅ **Config values**: `ZIGGY_SCAN_LIMIT=1000`

## 🏗️ **REALITY ARCHITECTURE SPECIFIC**

### **Current Reality Structure:**
```
reality/
├── bifrost/                    # NextJS + TypeScript + Tailwind
├── cosmic/                     # Cosmic components
├── quantum/                    # Quantum components
│   ├── library/
│   │   ├── keywords/
│   │   ├── definitions/
│   │   ├── classes/
│   │   ├── functions/
│   │   ├── objects/
│   │   ├── templates/
│   │   ├── index/
│   │   ├── rituals/
│   │   ├── blueprints/
│   │   ├── audio_processing/
│   │   ├── cinematic_tools/
│   │   └── lyric_analysis/
│   └── ziggy/
│       ├── config/
│       ├── core/
│       ├── data/
│       ├── memory/
│       ├── menus/
│       ├── personality/
│       ├── rituals/
│       ├── entities/
│       └── expertise/
└── void/                       # Void components
```

## 🎨 **BIFROST SPECIFIC (NextJS + TypeScript + Tailwind)**

### **File Structure:**
```
reality/bifrost/
├── app/                        # NextJS App Router
│   ├── (routes)/              # Route groups
│   ├── api/                   # API routes
│   ├── components/            # React components
│   ├── lib/                   # Utility libraries
│   ├── styles/                # Global styles
│   └── types/                 # TypeScript types
├── public/                    # Static assets
└── package.json
```

### **Conventions:**
- **React Components**: `PascalCase` (`BifrostBridge.tsx`, `QuantumVisualizer.tsx`)
- **API Routes**: `kebab-case` (`/api/audio-processing`, `/api/cinematic-tools`)
- **Route Groups**: `(group-name)/` (parentheses for grouping)
- **Page Files**: `page.tsx` (App Router convention)
- **Layout Files**: `layout.tsx`
- **Utility Files**: `kebab-case` (`audio-processor.ts`, `lyric-parser.ts`)
- **TypeScript Types**: `PascalCase` with `Type` suffix (`QuantumType.ts`, `RealityResponseType.ts`)
- **Tailwind**: Utility classes only, no custom CSS unless necessary

### **Example Bifrost Files:**
```typescript
// reality/bifrost/app/components/QuantumVisualizer.tsx
export function QuantumVisualizer({ data }: QuantumVisualizerProps) {
  return <div className="quantum-visualizer-container">{/* ... */}</div>;
}

// reality/bifrost/app/api/audio-processing/route.ts
export async function POST(request: Request) {
  // Process audio
}

// reality/bifrost/app/types/quantum-types.ts
export interface QuantumStateType {
  energyLevel: number;
  waveform: WaveformType;
}
```

## 🐍 **QUANTUM/ZIGGY SPECIFIC (Python)**

### **File Structure:**
```
reality/quantum/ziggy/
├── config/                    # Configuration files
├── core/                      # Core functionality
├── data/                      # Output data
├── memory/                    # Memory storage
├── menus/                     # Menu system
│   ├── main/                  # Main menu options
│   ├── analysis/              # Analysis tools
│   └── tools/                 # Utility tools
├── personality/               # Personality modules
├── rituals/                   # Ritual scripts
├── entities/                  # Entity definitions
└── expertise/                 # Expertise modules
```

### **Conventions:**
- **Python Files**: `snake_case` (`definition_extractor.py`, `taxonomic_analyzer.py`)
- **Python Classes**: `PascalCase` (`class DefinitionHarvester:`) 
                                  **[Descriptor(s)] + [Purpose Word]**
- **Python Functions**: `snake_case` (`def extract_definitions():`)
- **Python Variables**: `snake_case` (`scan_results = {}`)
- **Constants**: `SCREAMING_SNAKE_CASE` (`MAX_SCAN_DEPTH = 100`)

### **Example Quantum Files:**
```python
# reality/quantum/ziggy/core/definition_extractor.py
class DefinitionExtractor:
    def extract_definitions(self, file_path: str) -> Dict:
        scan_results = {}
        MAX_DEFINITIONS = 1000
        # ...
```

## 📁 **LIBRARY STRUCTURE SPECIFIC**

### **File Structure:**
```
reality/quantum/library/
├── keywords/                  # Keyword definitions
│   ├── public_keywords.txt
│   └── private_keywords.txt
├── definitions/               # General definitions
│   ├── public_definitions.txt
│   └── private_definitions.txt
├── classes/                   # Class definitions
│   ├── public_classes.txt
│   └── private_classes.txt
├── functions/                 # Function definitions
│   ├── public_functions.txt
│   └── private_functions.txt
├── objects/                   # Object definitions
├── templates/                 # Template definitions
├── index/                     # Index files
├── rituals/                   # Ritual definitions
├── blueprints/                # Blueprint definitions
├── audio_processing/          # Audio processing tools
├── cinematic_tools/           # Cinematic tools
└── lyric_analysis/            # Lyric analysis tools
```

### **Conventions:**
- **Library Files**: `snake_case.txt` (`public_definitions.txt`, `private_functions.txt`)
- **Category Folders**: `kebab-case` (`audio-processing/`, `lyric-analysis/`)
- **Index Files**: `index.md` or `index.json`

## 🌐 **URL & API ENDPOINT CONVENTIONS**

### **Bifrost API Routes:**
```
/api/quantum/scan              # POST - Initiate quantum scan
/api/quantum/analysis          # POST - Analyze quantum data
/api/library/definitions       # GET - Get definition list
/api/library/keywords          # GET - Get keyword list
/api/audio/process             # POST - Process audio file
/api/cinematic/render          # POST - Render cinematic
/api/lyrics/analyze            # POST - Analyze lyrics
```

### **Ziggy CLI Commands:**
```
ziggy scan --type=structure    # Scan directory structure
ziggy analyze --file=*.py      # Analyze Python files
ziggy library update           # Update library definitions
ziggy ritual run --name=clean  # Run a ritual
```

## 🐳 **DOCKER & DEPLOYMENT**

### **Service Names:**
```
bifrost-app                    # NextJS application
ziggy-service                  # Python Ziggy service
quantum-library                # Library management service
audio-processor                # Audio processing service
```

### **Environment Variables:**
```
REALITY_ENVIRONMENT=development
BIFROST_API_URL=http://localhost:3000
ZIGGY_DATA_PATH=/app/data
QUANTUM_LIBRARY_PATH=/app/library
MAX_CONCURRENT_SCANS=5
```

## 🎯 **PRACTICAL EXAMPLES**

### **File Creation Examples:**

**Python (Quantum/Ziggy):**
```python
# reality/quantum/ziggy/core/simple_definition_extractor.py
class SimpleDefinitionExtractor:
    MAX_EXTRACTION_DEPTH = 100
    
    def extract_from_file(self, file_path: str) -> Dict:
        definition_list = []
        # ...
```

**TypeScript (Bifrost):**
```typescript
// reality/bifrost/app/components/DefinitionVisualizer.tsx
interface DefinitionVisualizerProps {
  definitionList: DefinitionType[];
  maxDisplay: number;
}

export function DefinitionVisualizer({ 
  definitionList, 
  maxDisplay 
}: DefinitionVisualizerProps) {
  return (
    <div className="definition-visualizer-container">
      {/* ... */}
    </div>
  );
}
```

**Configuration:**
```python
# reality/quantum/ziggy/config/scan_config.py
SCAN_EXCLUSIONS = [
    '__pycache__',
    '.git',
    '.venv',
    'node_modules'
]

MAX_SCAN_DEPTH = 10
DEFAULT_OUTPUT_DIR = 'data/scans/'
```

## 📋 **QUICK REFERENCE TABLE**

| Context | Convention | Reality Example |
|---------|------------|-----------------|
| Python files | `snake_case` | `definition_extractor.py` |
| Python classes | `PascalCase` | `class DefinitionHarvester:` |
| TypeScript vars | `camelCase` | `const quantumState = {}` |
| TypeScript classes | `PascalCase` | `class QuantumAnalyzer {}` |
| React components | `PascalCase` | `DefinitionVisualizer.tsx` |
| CSS/HTML | `kebab-case` | `.audio-processing-tool` |
| URLs/APIs | `kebab-case` | `/api/lyric-analysis` |
| Directories | `kebab-case` | `audio-processing/` |
| Docker services | `kebab-case` | `bifrost-app` |
| Environment vars | `SCREAMING_SNAKE` | `QUANTUM_API_KEY` |
| Constants | `SCREAMING_SNAKE` | `MAX_DEFINITIONS` |

## 💡 **MEMORY AID**

**"Kebab the web, snake the code, camel the script, Pascal the class, scream the constants"**

- **Web/UI**: kebab-case (URLs, CSS, directories)
- **Python**: snake_case (files, vars, functions)
- **TypeScript vars**: camelCase
- **Classes**: PascalCase (Python, TypeScript, React)
- **Constants**: SCREAMING_SNAKE_CASE

---

**Last Updated**: Current Reality Architecture  
**Location**: `src/config/naming-guide.md`  
**Purpose**: Single source of truth for naming across all Reality components