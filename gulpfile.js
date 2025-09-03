const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const { deleteSync } = require("del");
const typescript = require("gulp-typescript");

const paths = {
  html: {
    src: "src/html/**/*.html",
    dest: "dist/",
  },
  styles: {
    src: "src/sass/**/*.sass",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/js/**/*.ts",
    dest: "dist/js/",
  },
  images: {
    src: "src/images/**/*",
    dest: "dist/images/",
  },
};

function clean(cb) {
  deleteSync(["dist"]);
  cb();
}

function html() {
  return src(paths.html.src)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
      })
    )
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

function styles() {
  return src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      cleanCSS({
        level: 2,
        format: "beautify",
      })
    )
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  const tsProject = typescript.createProject({
    target: "ES2020",
    module: "ES2020",
    moduleResolution: "node",
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
  });

  return src(paths.scripts.src)
    .pipe(tsProject())
    .pipe(concat("main.js"))
    .pipe(
      uglify({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info", "console.debug"],
        },
        mangle: true,
      })
    )
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function images() {
  return src(paths.images.src, { encoding: false }).pipe(
    dest(paths.images.dest)
  );
}

function watchFiles() {
  watch(paths.html.src, html);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    port: 3000,
  });
}

const build = series(clean, parallel(html, styles, scripts, images));

const dev = series(build, parallel(watchFiles, serve));

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = build;
exports.dev = dev;
exports.default = dev;
