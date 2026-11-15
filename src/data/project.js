export const project = {
  eyebrow: 'Mobile dev workflow',
  name: 'Pocket Dev',
  tagline:
    'A Vue + Vite site written, edited and updated entirely from a phone, using Acode and two small Python tools.',
  about: [
    'This site is both the project and its own documentation. It is a Vue 3 app built with Vite, and all of its code is written on an Android phone in the Acode editor.',
    'Instead of copying files back and forth one at a time, the whole src/ folder is packed into a single text file, sent to an AI assistant for changes, and the updated files come back in one text file that is unpacked straight into the project.',
    'The goal is a simple, repeatable loop: pack, request, unpack, run. No laptop needed.',
  ],
  footer: 'Built with Vue + Vite, edited in Acode on a phone',
}

export const steps = [
  {
    title: 'Write code in Acode',
    where: 'On the phone',
    detail:
      'The project lives on the phone and is opened in Acode. All app code sits inside the src/ folder.',
  },
  {
    title: 'Pack with srcpack',
    where: 'Acode terminal',
    detail:
      'Running srcpack collects every readable text file under src/ into bundled_project_code.txt. Binary files such as images and fonts are skipped.',
  },
  {
    title: 'Send to Claude',
    where: 'Claude Project',
    detail:
      'The bundle is attached in a Claude Project along with a description of the change wanted.',
  },
  {
    title: 'Get updated files',
    where: 'Claude Project',
    detail:
      'Claude returns updated_bundled_project_code.txt containing only the files it changed or created, each with its complete content.',
  },
  {
    title: 'Unpack with srcunpack',
    where: 'Acode terminal',
    detail:
      'Running srcunpack writes each file from the returned bundle back into src/. Files not in the bundle are left untouched.',
  },
  {
    title: 'Run and check',
    where: 'Acode terminal',
    detail:
      'The Vite dev server is started and the result is checked in the browser. Then the loop starts again.',
  },
]

export const tools = [
  {
    name: 'srcpack',
    tag: 'Python · pack.py',
    description:
      'Bundles the project source into one text file that is easy to attach and share.',
    input: 'src/',
    output: 'bundled_project_code.txt',
  },
  {
    name: 'srcunpack',
    tag: 'Python · unpack.py',
    description:
      'Reads a returned bundle and writes each file back to its path in the project.',
    input: 'updated_bundled_project_code.txt',
    output: 'src/',
  },
]

export const bundleRules = [
  'Each separator line is exactly 80 "=" characters.',
  'One blank line follows the header, then the full file content.',
  'Paths start with src/ and use forward slashes.',
  'Returned bundles hold only changed or new files, always complete.',
  'Deleted files are handled by hand, not through the bundle.',
]

export const stack = [
  'Vue 3',
  'Vite',
  'Acode',
  'Python',
  'Claude Projects',
  'Android',
]

export const timeline = [
  {
    label: 'Stage 1',
    title: 'Vite starter',
    detail:
      'The project began as the default Vue + Vite starter page with a counter and links.',
  },
  {
    label: 'Stage 2',
    title: 'The Bookshelf',
    detail:
      'The starter was replaced with a reading list: searchable books, genre filters and a read tracker.',
  },
  {
    label: 'Stage 3',
    title: 'Pocket Dev',
    detail:
      'The site now describes itself: the phone-only workflow and the tools behind it.',
  },
]
