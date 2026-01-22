git status
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git add expense-manager-html
git add expense-manager-react
git add .gitignore
git add .gitignore
git add .
git commit -m "v1: HTML expense manager baseline"
git commit -m "v2: Expense Manager – React + Vite + Tailwind"
git branch
git checkout -b react-ui
git checkout main
git checkout react-ui
git branch -M main
git remote add origin https://github.com/<your-username>/expense-manager.git
git remote -v
git push -u origin main
git push -u origin react-ui
git rev-parse --show-toplevel
git log --oneline
git status --ignored

You modified an existing file (MOST COMMON)

git status
Option A — Stage specific file (BEST PRACTICE)
git add src/components/Tabs.jsx
Option B — Stage all modified files
git add .
Commit with message
git commit -m "fix: adjust tabs UI spacing"
Push to GitHub
git push
Case 3: You changed file but want to DISCARD changes

❌ Don’t want to keep the edits?
git restore src/components/Tabs.jsx
(This resets the file to last committed version)

Quick Decision Table
Situation	Commands
Check changes	    git status
Keep changes	    git add
Save snapshot	    git commit
Upload	            git push
Undo local change	git restore <file>

Important Concept
There are 3 levels of “undo” in Git:
1️⃣ Undo before commit
2️⃣ Undo after commit (local, not pushed)
3️⃣ Undo after commit (already pushed)

CASE 1: Restore BEFORE commit (easy & safe)
You edited a file but did not commit yet.

git restore src/components/Tabs.jsx
✔ File goes back to last commit
✔ No history change

✅ CASE 2: Restore AFTER commit (NOT pushed yet)

You committed, but realized:

“This commit is wrong, I want to go back”

🔍 First, see commits
git log --oneline


Example:

a1b2c3d feat: add tabs
e4f5g6h feat: add header

🔙 Option A: Go back to previous commit (keep files)
git reset --soft HEAD~1


✔ Commit removed
✔ File changes kept
✔ You can recommit correctly

🔙 Option B: Go back and DELETE changes (dangerous)
git reset --hard HEAD~1

⚠️ Completely deletes changes
⚠️ Use only if 100% sure

CASE 3: Commit already PUSHED (MOST IMPORTANT)

🚨 Never rewrite history on shared branches

Instead, use revert 👇

🔄 Safest way
git revert HEAD


✔ Creates a NEW commit
✔ Undo happens cleanly
✔ Safe for GitHub

This is what professionals do.
Summary Table (Save This)
Situation	Command
Undo before commit	                git restore <file>
Undo last commit (keep changes)	    git reset --soft HEAD~1
Undo last commit (delete changes)	git reset --hard HEAD~1
Undo pushed commit	                git revert HEAD