
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs    from '@rollup/plugin-commonjs';
import replace     from '@rollup/plugin-replace';





const config = {

  input: 'build/typescript/index.js',

  output: {
    file    : 'build/rollup/index.js',
    format  : 'es',
    name    : 'soundtrack',
    exports : 'named'
  },

  plugins : [

    nodeResolve({
      mainFields     : ['module', 'main'],
      browser        : true,
      extensions     : [ '.js', '.json', '.ts', '.tsx' ],
      preferBuiltins : false
    }),

    commonjs(),

    replace({
      preventAssignment      : true,
      'process.env.NODE_ENV' : JSON.stringify( 'production' )
    })

  ]

};





const cjs_config = {

  input: 'build/typescript/index.js',

  output: {
    file    : 'build/rollup/index.cjs',
    format  : 'cjs',
    name    : 'soundtrack',
    exports : 'named'
  },

  plugins : [

    nodeResolve({
      mainFields     : ['module', 'main'],
      browser        : true,
      extensions     : [ '.js', '.json', '.ts', '.tsx' ],
      preferBuiltins : false
    }),

    commonjs(),

    replace({
      preventAssignment      : true,
      'process.env.NODE_ENV' : JSON.stringify( 'production' )
    })

  ]

};





export default [ config, cjs_config ];
