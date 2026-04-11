
### autoupdate database.type.ts from supabase
## in Powershell
# Navigate to your project root first
cd C:/_superposition/audhdities

# Generate fresh types from your linked project
supabase gen types typescript --linked > src/types/supabase/database.types.ts

## new components
npx shadcn@latest add textarea   

# Create virtual environment
python -m venv venv

# Activate it:
# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate

## Types-Test
npx tsc --noEmit