'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown';

import Toobar from './tiptap-toolbar'

interface TiptapProps {
  description: string
  onChange: (richText: string) => void
}

const Tiptap = ({ description, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit.configure(), Markdown],
    content: description,
    editorProps: {
      attributes: {
        class: 'cursor-text rounded-md min-h-[150px] max-h-[200px] overflow-y-auto p-4 focus:outline-none border focus:border-white prose dark:prose-invert'
      }
    },
    onUpdate({ editor }) {
      onChange(editor.storage.markdown.getMarkdown())
    }
  })

  return (
    <div className='flex flex-col justify-stretch gap-2'>
      <Toobar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap