#!/bin/bash

loop_dir="./src"
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
  local filename="${file##*/}"
  local filename_without_extension="${filename%.*}"
  local full_file_path="${file#./}"

  echo "export { default as $filename_without_extension } from './$full_file_path'" >> "$export_file"
}

echo "import './styles.css';" > "$export_file"

iterate_files "$loop_dir"



