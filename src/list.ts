export interface Item {
  name: string;
  group: string;
  links: { path: string; desc?: string }[];
}

export const list: Item[] = [
  {
    name: 'General',
    group: '1',
    links: [
      {
        path: '/api/',
        desc: 'Get all endpoints as JSON',
      },
      {
        path: '/echo/',
        desc: 'Output your HTTP call details',
      },
    ],
  },
  {
    name: 'Status Code',
    group: 'Headers',
    links: [
      {
        path: '/statusCode/random/',
        desc: 'Get a random HTTP code',
      },
      {
        path: '/statusCode/:code/',
        desc: 'Get the specified HTTP code',
      },
    ],
  },
  {
    name: 'compression',
    group: 'Headers',
    links: [
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
  },
  {
    name: 'General',
    group: 'HTML',
    links: [
      { path: '/html/all_tags.html' },
      { path: '/html/valid.html' },
      { path: '/html/invalid.html' },
    ],
  },
  {
    name: 'Meta',
    group: 'HTML',
    links: [
      { path: '/html/meta/base/relative.html' },
      { path: '/html/meta/base/nodomain.html' },
      { path: '/html/meta/base/absolute.html' },
      { path: '/html/meta/canonical/absolute.html' },
      { path: '/html/meta/canonical/nodomain.html' },
      { path: '/html/meta/canonical/relative.html' },
      { path: '/html/meta/og/general.html' },
      { path: '/html/meta/og/article.html' },
      { path: '/html/meta/og/audio.html' },
      { path: '/html/meta/og/video.html' },
      { path: '/html/meta/robots/nofollow.html' },
      { path: '/html/meta/robots/noindex.html' },
      { path: '/html/meta/http_equiv.html' },
    ],
  },
  {
    name: 'Links',
    group: 'HTML',
    links: [
      { path: '/html/links/absolute.html' },
      { path: '/html/links/hash.html' },
      { path: '/html/links/mailto.html' },
      { path: '/html/links/nodomain.html' },
      { path: '/html/links/nofollow.html' },
      { path: '/html/links/normalized.html' },
      { path: '/html/links/relative.html' },
    ],
  },
  {
    name: 'JSON LD',
    group: 'HTML',
    links: [
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
  },
  {
    name: 'General',
    group: 'Javascript',
    links: [{ path: '/html/js/redirect.html', desc: 'Will redirect onload' }],
  },
  {
    name: 'Sitemap',
    group: 'Content',
    links: [
      { path: '/sitemap/valid.xml' },
      { path: '/sitemap/invalid.xml' },
      { path: '/sitemap/index.xml' },
      { path: '/sitemap/index_gz.xml' },
      { path: '/sitemap/compressed.xml.gz' },
    ],
  },
  {
    name: 'Rss',
    group: 'Content',
    links: [
      { path: '/rss/valid.rss' },
      { path: '/rss/valid.atom' },
      { path: '/rss/valid.xml' },
    ],
  },
  {
    name: 'JSON',
    group: 'Content',
    links: [
      { path: '/json/valid.json' },
      { path: '/json/broken.json' },
      { path: '/json/invalid.json' },
    ],
  },
  {
    name: 'CSV',
    group: 'Content',
    links: [{ path: '/csv/valid.csv' }, { path: '/csv/invalid.csv' }],
  },
  {
    name: 'DOCX',
    group: 'Content',
    links: [{ path: '/docx/valid.docx' }],
  },
  {
    name: 'PDF',
    group: 'Content',
    links: [{ path: '/pdf/valid.pdf' }],
  },
  {
    name: 'PPTX',
    group: 'Content',
    links: [{ path: '/pptx/valid.pptx' }],
  },
  {
    name: 'XLSX',
    group: 'Content',
    links: [{ path: '/xlsx/valid.xlsx' }],
  },
  {
    name: 'Robots.txt',
    group: 'Rules',
    links: [
      { path: '/robots_txt/index.html' },
      { path: '/robots_txt/no_index.html' },
    ],
  },
  {
    name: 'Website',
    group: 'Website',
    links: [{ path: '/website/news/index.html' }],
  },
];
