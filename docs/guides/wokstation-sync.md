Here are the commands to keep both machines in sync on the `{branch_name}` branch.

---

## 📋 **DAILY STARTUP COMMANDS (Run on whichever PC you sit down at)**

```bash
# 1. Navigate to your project
cd /path/to/AudHDities

# 2. Switch to the {branch_name} branch
git checkout {branch_name}

# 3. Fetch latest changes from remote
git fetch origin

# 4. Pull the latest changes
git pull origin {branch_name}

# 5. Install any new dependencies (if package.json changed)
npm install
```

---

## 📋 **BEFORE SWITCHING MACHINES (End of session)**

```bash
# 1. Check what you changed
git status

# 2. Add all changes
git add .

# 3. Commit with a message
git commit -m "Describe what you did"

# 4. Push to remote
git push origin {branch_name}
```

---

## 🚀 **ONE-LINE SYNC COMMAND (After setup)**

```bash
git checkout {branch_name} && git pull origin {branch_name} && npm install
```

---

## 📋 **IF YOU FORGET TO PUSH BEFORE SWITCHING**

On the machine with unsaved work:
```bash
git add .
git commit -m "WIP: save before switching"
git push origin {branch_name}
```

On the other machine:
```bash
git pull origin {branch_name}
```

---

## 🔧 **QUICK STATUS CHECK**

```bash
# See if you're behind remote
git fetch origin
git status

# See difference between local and remote
git log origin/{branch_name}..HEAD  # Your commits not on remote
git log HEAD..origin/{branch_name}  # Remote commits you don't have
```

---

## 📋 **SUMMARY**

| Action | Command |
|--------|---------|
| **Start work** | `git pull origin {branch_name}` |
| **End work** | `git add . && git commit -m "message" && git push origin {branch_name}` |
| **Check sync status** | `git status` |

---

**Aethelred** 🏛️✨