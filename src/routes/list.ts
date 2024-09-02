export const list = {
  general: [
    {
      path: '/echo/',
      desc: 'Output your HTTP call details',
    },
  ],
  'Status Code': [
    {
      path: '/statusCode/random/',
      desc: 'Get a random HTTP code',
    },
    {
      path: '/statusCode/:code/',
      desc: 'Get the specified HTTP code',
    },
  ],
  JSON: [
    { path: '/json/valid.json' },
    { path: '/json/broken.json' },
    { path: '/json/invalid.json' },
  ],
  HTML: [
    { path: '/html/all_tags.html' },
    { path: '/html/valid.html' },
    { path: '/html/invalid.html' },
    { path: '/html/js/redirect.html' },
    { path: '/html/meta/base/relative.html' },
    { path: '/html/meta/base/nodomain.html' },
    { path: '/html/meta/base/absolute.html' },
    { path: '/html/meta/canonical/absolute.html' },
    { path: '/html/meta/canonical/nodomain.html' },
    { path: '/html/meta/canonical/relative.html' },
    { path: '/html/meta/og/general.html' },
    { path: '/html/meta/og/audio.html' },
    { path: '/html/meta/og/video.html' },
    { path: '/html/meta/robots/nofollow.html' },
    { path: '/html/meta/robots/noindex.html' },
    { path: '/html/meta/http_equiv.html' },
    { path: '/html/meta/link_nofollow.html' },
  ],
  'HTML JSON LD': [
    { path: '/html/json-ld/book.html' },
    { path: '/html/json-ld/breadcrumb.html' },
    { path: '/html/json-ld/carousel.html' },
    { path: '/html/json-ld/event.html' },
    { path: '/html/json-ld/faq.html' },
    { path: '/html/json-ld/image.html' },
    { path: '/html/json-ld/invalid.html' },
    { path: '/html/json-ld/newsarticle.html' },
    { path: '/html/json-ld/organization.html' },
    { path: '/html/json-ld/product_3d.html' },
    { path: '/html/json-ld/qa.html' },
    { path: '/html/json-ld/recipe.html' },
    { path: '/html/json-ld/video.html' },
  ],
  'robots.txt': [
    { path: '/robots_txt/index.html' },
    { path: '/robots_txt/no_index.html' },
  ],
  csv: [{ path: '/csv/valid.csv' }, { path: '/csv/invalid.csv' }],
  compression: [
    {
      path: '/compression/brotly/',
      desc: 'Get a page compressed with brotly',
    },
    {
      path: '/compression/gzip/',
      desc: 'Get a page compressed with gzip',
    },
    {
      path: '/compression/deflate/',
      desc: 'Get a page compressed with deflate',
    },
  ],
};
