npm run build
cd build
git init
git remote add origin https://github.com/FurmoDT/service.git
git add .
git commit -m "deploy"
git push origin --delete gh-pages
git branch -m gh-pages
git push origin gh-pages
