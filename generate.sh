#!/bin/bash

MY_DESIGN_NAME=$1
MY_ARTIST_NAME=$2
EXAMPLE_DESIGN_NAME_MATCH="'example',"
MY_DESIGN_NAME_REPLACE="$EXAMPLE_DESIGN_NAME_MATCH\n    '$MY_DESIGN_NAME',"

cp -r $PWD/designs/example $PWD/designs/$MY_DESIGN_NAME

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/Example/$MY_DESIGN_NAME/" $PWD/designs/$MY_DESIGN_NAME/index.js
  sed -i '' "s/exampleartistname/$MY_ARTIST_NAME/" $PWD/designs/$MY_DESIGN_NAME/index.js
  sed -i '' "s/$EXAMPLE_DESIGN_NAME_MATCH/$MY_DESIGN_NAME_REPLACE/" $PWD/artist.js
else
  sed -i "s/Example/$MY_DESIGN_NAME/" $PWD/designs/$MY_DESIGN_NAME/index.js
  sed -i "s/exampleartistname/$MY_ARTIST_NAME/" $PWD/designs/$MY_DESIGN_NAME/index.js
  sed -i "s/$EXAMPLE_DESIGN_NAME_MATCH/$MY_DESIGN_NAME_REPLACE/" $PWD/artist.js
fi
