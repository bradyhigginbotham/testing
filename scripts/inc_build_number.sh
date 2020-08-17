# Get branch name and don't proceed if it's not develop
GIT_BRANCH_NAME=`git rev-parse --abbrev-ref HEAD`

cd ..

VERSION_BUILD=`jq .versionCode package.json`
VERSION_BUILD=$((${VERSION_BUILD//\"/}+1))
VERSION_BUILD_STRING=\"$VERSION_BUILD\"

jq .versionCode=$VERSION_BUILD_STRING package.json > tmp.json
mv tmp.json package.json

# # Commit and push changes to the repo

git add package.json
git add ios/PrestoDriver/Info.plist

git commit -m"chore: version build bump [ci skip]"
git push --set-upstream origin $GIT_BRANCH_NAME