#!/bin/bash

# This script is used to fix the import of fmin in venn.js
target_file="./node_modules/crux/node_modules/venn.js/src/diagram.js"
original_import='import {nelderMead} from "../node_modules/fmin/index.js"'
replacement_import='import {nelderMead} from "fmin"'


target_file2="./node_modules/crux/node_modules/venn.js/src/layout.js"
original_import2="scale} from '../node_modules/fmin/index.js'"
replacement_import2="scale} from 'fmin'"
#echo "Updating ${target_file}"
#sed -i "" "s|$original_import|$replacement_import|g" "$target_file"





#echo "Updating ${target_file2}"

#sed -i "s|$original_import2|$replacement_import2|g" "$target_file2"


# sed -i 's#from "\.\./node_modules/fmin/index\.js"#from "fmin"#g' "$target_file"

# sed -i 's#from "\.\./node_modules/fmin/index\.js"#from "fmin"#g' "$target_file2"

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i "" "s|$original_import|$replacement_import|g" "$target_file"
    sed -i "" "s|$original_import2|$replacement_import2|g" "$target_file2"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sed -i "s|$original_import|$replacement_import|g" "$target_file"
    sed -i "s|$original_import2|$replacement_import2|g" "$target_file2"
fi