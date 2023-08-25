#!/bin/bash

loop_dir="./src/lib"
export_file="./src/lib/index.ts"

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
  local filename_without_extension="${1##*/}"
  filename_without_extension="${filename_without_extension%.*}"
  local full_file_path="${1#./src/lib}"
  if [[ $full_file_path != *.svelte ]]; then
      return;
  fi
  echo "export { default as $filename_without_extension } from './$full_file_path'" >> "$export_file"
}

echo "import './styles.css';" > "$export_file"
iterate_files "$loop_dir"



