import { defineField, defineType } from 'sanity'
import { User } from 'lucide-react'

export default defineType({
  name: 'contactPage',
  title: 'Trang Liên Hệ',
  type: 'document',
  icon: User as any,
  fields: [
    // --- 1. THÊM LẠI TITLE (DÙNG CHO QUẢN TRỊ) ---
    defineField({
      name: 'internalTitle',
      title: 'Tên trang (Quản trị)', 
      type: 'string',
      description: 'Tiêu đề này chỉ dùng để hiển thị trong Sanity Studio cho dễ nhìn, không hiện ra ngoài web.',
      initialValue: 'Cấu hình Trang Liên Hệ', // Giá trị mặc định
    }),

    // --- PHẦN 1: WORK ---
    defineField({
      name: 'workContact',
      title: 'Thông tin công việc (Work)',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Số điện thoại', type: 'string' },
        { name: 'resume', title: 'File CV (PDF)', type: 'file' },
      ]
    }),

    // --- PHẦN 2: SOCIALS ---
    defineField({
      name: 'socialLinks',
      title: 'Mạng xã hội (Socials)',
      type: 'array',
      of: [
        {
          type: 'object',
          // Preview cho từng item trong mảng Social
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url'
            }
          },
          fields: [
            {
              name: 'platform',
              title: 'Nền tảng',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'X (Twitter)', value: 'x' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Youtube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Behance', value: 'behance' },
                  { title: 'Dribbble', value: 'dribbble' },
                  { title: 'Discord', value: 'discord' },
                  { title: 'Twitch', value: 'twitch' },
                ],
              },
            },
            { name: 'url', title: 'Đường dẫn', type: 'url' }
          ]
        }
      ]
    }),
  ],

  // --- 2. CẤU HÌNH PREVIEW CHO DOCUMENT CHÍNH ---
  preview: {
    select: {
      title: 'internalTitle', // Lấy field này làm tiêu đề to
      subtitle: 'workContact.email' // Lấy email làm dòng phụ nhỏ ở dưới
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Cấu hình Trang Liên Hệ',
        subtitle: subtitle || 'Chưa có email',
      }
    }
  }
})