'use client';
import Bold from '@tiptap/extension-bold';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  BoldIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  RocketIcon,
} from 'lucide-react';
import { type Dispatch, type SetStateAction, useCallback } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

type TipTapProps = {
  content?: string;
  setContent?: Dispatch<SetStateAction<string>>;
  onClick?: () => void;
};

const Tiptap = ({ content, setContent, onClick }: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Link.configure({
        HTMLAttributes: {
          class: 'text-primary underline font-medium',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl border my-2',
        },
      }),
      Text,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'lg:text-base/7 text-sm/7 text-justify',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent?.(editor.getHTML());
    },
  });

  const toggleBold = () => editor?.commands.toggleBold();
  const toggleItalic = () => editor?.commands.toggleItalic();

  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    // cancelled
    if (url === null) {
      return;
    }
    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }, [editor]);

  return (
    <section className="grid gap-4">
      <EditorContent
        className="min-h-60 w-full"
        editor={editor}
        placeholder="hello world"
      />
      <Separator className="bg-border" />
      <nav className="flex items-center gap-4">
        <Button
          size={'icon'}
          onClick={toggleBold}
          variant={editor?.isActive('bold') ? 'secondary' : 'ghost'}
        >
          <BoldIcon className="size-4" />
        </Button>
        <Button
          size={'icon'}
          onClick={toggleItalic}
          variant={editor?.isActive('italic') ? 'secondary' : 'ghost'}
        >
          <ItalicIcon className="size-4" />
        </Button>
        <Button onClick={addImage} variant={'secondary'} size={'icon'}>
          <ImageIcon className="size-4" />
        </Button>
        <Button onClick={setLink} variant={'secondary'} size={'icon'}>
          <LinkIcon className="size-4" />
        </Button>
        <Button onClick={onClick} variant={'default'} className="mr-auto">
          پست کن
          <RocketIcon className="mr-2 size-4" />
        </Button>
      </nav>
    </section>
  );
};

export default Tiptap;
