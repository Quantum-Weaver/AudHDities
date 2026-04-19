
### autoupdate database.type.ts from supabase
## in Powershell
# Navigate to your project root first
cd C:/_superposition/audhdities

# Generate fresh types from your linked project
supabase gen types typescript --linked > src/types/supabase/database.types.ts
npm install supabase@latest

npx supabase gen types typescript --linked > src/types/supabase/database.types.ts

## new components
npx shadcn@latest add Textarea   

# Create virtual environment
python -m venv venv

# Activate it:
# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate

## Types-Test
npx tsc --noEmit

npx tsx src/scripts/system/gaia/index.ts --dry-run
npx tsx src/scripts/system/cosmic/index.ts --dry-run


## 🚀 **Help After Git Init - Pull from GitHub**

Since you've moved your dev folder from D: to C: and done `git init`, here's how to connect to your existing GitHub repository and pull the `superposition` branch:

### **Step 1: Add the Remote Origin**

```bash
# Add your GitHub repository as the remote origin
git remote add origin https://github.com/Quantum-Weaver/AudHDities.git

# Verify the remote was added correctly
git remote -v
```

### **Step 2: Fetch the Superposition Branch**

```bash
# Fetch all branches from the remote
git fetch origin

# Check what branches are available
git branch -r
```

### **Step 3: Pull the Superposition Branch**

```bash
# Pull the superposition branch and merge with your local
git pull origin superposition

# OR if you want to reset and match exactly:
git fetch origin
git reset --hard origin/superposition
```

### **Step 4: Set Up Tracking (Optional but recommended)**

```bash
# Set your local branch to track the remote superposition branch
git branch --set-upstream-to=origin/superposition

# Now you can just use 'git pull' in the future
```

---

## 📋 **Complete One-Liner (If You Want a Fresh Start)**

If you want to completely replace your local folder with what's on GitHub:

```bash
# Navigate to your project folder (C: drive location)
cd C:/path/to/your/AudHDities

# Remove the local git history
rm -rf .git

# Clone fresh from GitHub
git clone -b superposition https://github.com/Quantum-Weaver/AudHDities.git .

# Verify
git status
git branch
```

---

## 🔍 **Troubleshooting**

### **If you get "fatal: refusing to merge unrelated histories":**

```bash
git pull origin superposition --allow-unrelated-histories
```

### **If you have local changes you want to discard:**

```bash
# Discard all local changes
git reset --hard HEAD
git clean -fd

# Then pull
git pull origin superposition
```

### **If you get authentication error (using HTTPS):**

```bash
# Use GitHub CLI or Personal Access Token
# Or switch to SSH if you have keys set up
git remote set-url origin git@github.com:Quantum-Weaver/AudHDities.git
git pull origin superposition
```

---

## ✅ **After Successful Pull**

```bash
# Check you're on the right branch
git branch

# Should show: * superposition

# Install dependencies (if needed)
npm install

# Run your dev server
npm run dev
```

---

## 🎯 **Quick Summary**

```bash
git remote add origin https://github.com/Quantum-Weaver/AudHDities.git
git fetch origin
git pull origin superposition
```