import { defineField, defineType } from 'sanity';
import { TECH_STACK_DETAILS, PROJECT_CATEGORIES } from '../../src/constants/options';

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên Dự án',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
        { name: 'en', title: 'Tiếng Anh', type: 'text' },
        { name: 'vi', title: 'Tiếng Việt', type: 'text' },
        { name: 'ja', title: 'Tiếng Nhật', type: 'text' },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Danh mục (Category)',
      type: 'string',
      options: {
        // Lấy danh sách từ file options.ts, bỏ chữ "All" đi vì trong admin không chọn All
        list: PROJECT_CATEGORIES.filter(c => c !== "All").map(c => ({ title: c, value: c })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'techStack',
      title: 'Công nghệ sử dụng',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        // Hiển thị danh sách chọn thay vì cho gõ tay
        list: TECH_STACK_DETAILS,
      },
    }),
    defineField({
      name: 'links',
      title: 'Liên kết',
      type: 'object',
      fields: [
        { name: 'demo', title: 'Live Demo URL', type: 'url' },
        { name: 'repo', title: 'GitHub Repo URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Ảnh đại diện',
      type: 'image',
      description: 'Thumbnail này 16:9, cắt sao cho đẹp vào',
      options: {
        hotspot: true, // BẮT BUỘC: Bật tính năng Crop & Focus Point
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Nổi bật (Hiện trang chủ)',
      type: 'boolean',
      initialValue: false,
    }),
    // --- ĐỔI publishedAt ĐỂ LỌC NGÀY ---
    defineField({
      name: 'publishedAt',
      title: 'Ngày hoàn thành',
      type: 'date', // Dùng type date để sort cho dễ
      validation: (Rule) => Rule.required(),
    }),
  ],
})