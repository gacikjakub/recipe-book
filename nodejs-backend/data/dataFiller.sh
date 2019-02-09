#!/usr/bin/env bash

for file in *.json; do

	echo $file;

curl -X POST \
	-H "Content-Type: application/json" \
	-d "@${file}"  \
	http://localhost:3000/recipes;

done
