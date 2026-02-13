import { defineField, defineType } from 'sanity';
import { Images } from 'lucide-react'; // Icon cho đẹp (nếu muốn)
// Import Component vừa tạo (dùng đường dẫn tương đối)
import { DriveUrlInput } from '../components/DriveUrlInput';

export default defineType({
  name: 'album',
  title: 'Album Ảnh',
  type: 'document',
  icon: Images as any, // Icon hiển thị trong menu
  fields: [
    defineField({
      name: 'title',
      title: 'Tên Album',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    // --- TỰ ĐỘNG TẠO SLUG ---
    defineField({
      name: 'slug',
      title: 'Đường dẫn (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Mô tả ngắn',
      type: 'object',
      fields: [
        { name: 'en', title: 'Tiếng Anh', type: 'text', rows: 3 },
        { name: 'vi', title: 'Tiếng Việt', type: 'text', rows: 3 },
        { name: 'ja', title: 'Tiếng Nhật', type: 'text', rows: 3 },
      ],
    }),

    // --- CUSTOM INPUT CHO GOOGLE DRIVE ---
    defineField({
      name: 'googleDriveId',
      title: 'Google Drive Folder ID',
      type: 'string',
      components: {
        input: DriveUrlInput, // <--- Gắn Component xử lý link vào đây
      },
      description: 'Vào folder Google Drive -> Chia sẻ công khai (Anyone with the link) -> Copy Link dán vào đây.',
      validation: (Rule) => Rule.required().error('Bắt buộc phải có ID folder để lấy ảnh'),
    }),

    defineField({
      name: 'date',
      title: 'Ngày chụp',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      initialValue: () => new Date().toISOString().split('T')[0],
    }),

    defineField({
      name: 'coverImage',
      title: 'Ảnh bìa Album',
      type: 'image',
      options: { hotspot: true },
      description: 'Ảnh đại diện hiển thị bên ngoài danh sách Album.',
    }),

    defineField({
      name: 'tags',
      title: 'Tags (Thẻ)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date,
        media,
      };
    },
  },
});