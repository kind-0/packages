#!/bin/bash

export_file="./index.ts"

iterate_files() {
  local dir="$1"
  for file in "$dir"/*; do
    if [ -d "$file" ]; then
      iterate_files "$file"
    elif [ -f "$file" ]; then
      process_file "$file"
    fi
  done
}

process_file() {
  local file="$1"
  local file_path="${file#./}"
  local file_path_export="${file_path%.*}"

  local export_list=()

  while IFS= read -r line; do
    if [[ $line =~ export\ (class|const|enum|type|function)\ ([a-zA-Z_][a-zA-Z_0-9]*) ]]; then
      #export_type="${BASH_REMATCH[1]}"
      export_name="${BASH_REMATCH[2]}"
      export_list+=("$export_name")
    fi
  done < "./$file_path"

  concatenated_file_exports=""

  for element in "${export_list[@]}"; do
    if [ -n "$concatenated_file_exports" ]; then
      concatenated_file_exports+=",$element"
    else
      concatenated_file_exports="$element"
    fi
  done

  echo "export { $concatenated_file_exports } from './$file_path_export'" >> "$export_file"
}

> "$export_file"

iterate_files "./src"
