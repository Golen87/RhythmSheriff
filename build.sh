npm run build
cp -r src/assets/ dist/
mkdir dist/src
mv dist/assets/ dist/src/
git add dist/