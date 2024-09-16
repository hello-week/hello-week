set -e
echo "Current version:" $(grep version package.json | sed -E 's/^.*"(4[^"]+)".*$/\1/')
echo "Enter release version: "
read VERSION

read -p "Releasing v$VERSION - are you sure? (y/n)" -n 1 -r
echo    # (OPTIONAL) MOVE TO A NEW LINE
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing v$VERSION ..."
  npm run lint:js
  npm run test

  npm run build
  # GENERATE THE VERSION SO THAT THE CHANGELOG CAN BE GENERATED TOO
  npm version --no-git-tag-version --no-commit-hooks --new-version $VERSION

  # CHANGELOG
  npm run changelog

  echo "Please check the git history and the changelog and press enter"
  read OKAY

  # COMMIT AND TAG
  git add CHANGELOG.md package.json
  git commit -m "chore(release): v$VERSION"
  git tag -a "v$VERSION" -m $VERSION

  # COMMIT
  npm publish --tag next --new-version "$VERSION" --no-commit-hooks --no-git-tag-version

  # PUBLISH
  git push origin refs/tags/v$VERSION
  git push
fi
