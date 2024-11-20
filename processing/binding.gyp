{
    "targets": [
 {
    "target_name" "processing",
    "sources":[ "processing.cpp" ],
    "dependencies": [
     "<!(node -p \"require('node-addon-api').gyp\")"
    ],
    "inculde_dirs": [
    "<!(node -p \"require('node-addon-api').include_dir\")"
    ],
    "cflags_cc!": ["-fno=exceptions" ],
    "defines": ["NPI_DISABLE_CCO_EXCEPTIONS" ]
}
]
}