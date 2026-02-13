import { defineField, defineType } from 'sanity'
import { User, AlignLeft, Clock, List, CheckSquare } from 'lucide-react'
// Import danh sách công nghệ
import { TECH_OPTIONS } from '../../src/constants/options'

// Helper cho chuỗi đa ngôn ngữ (giữ nguyên)
const localizedString = (name: string, title: string) => ({
  name,
  title,
  type: 'object',
  fields: [
    { name: 'en', title: 'Tiếng Anh', type: 'string' },
    { name: 'vi', title: 'Tiếng Việt', type: 'string' },
    { name: 'ja', title: 'Tiếng Nhật', type: 'string' },
  ],
})

// --- QUAN TRỌNG: Helper cho Rich Text (Bold, Italic...) ---
const localizedBlock = (name: string, title: string) => ({
  name,
  title,
  type: 'object',
  fields: [
    { 
      name: 'en', title: 'Tiếng Anh', type: 'array', of: [{type: 'block'}] 
    },
    { 
      name: 'vi', title: 'Tiếng Việt', type: 'array', of: [{type: 'block'}] 
    },
    { 
      name: 'ja', title: 'Tiếng Nhật', type: 'array', of: [{type: 'block'}] 
    },
  ],
})

export default defineType({
  name: 'aboutPage',
  title: 'Trang About (Wiki Style)',
  type: 'document',
  icon: User as any,
  fields: [
    defineField({
      name: 'title',
      title: 'Tên hiển thị trong Admin',
      type: 'string',
      initialValue: 'About Page Content',
    }),

    // --- 1. INFO BOX (Cột bên phải) ---
    defineField({
      name: 'infoBox',
      title: 'Info Box (Tóm tắt)',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'avatar', title: 'Ảnh đại diện', type: 'image', options: { hotspot: true } },
        { name: 'name', title: 'Họ tên hiển thị', type: 'string' },
        
        // Yêu cầu 4: Role dạng Tags (Enter là tách)
        {
            name: 'roles',
            title: 'Nghề nghiệp / Vai trò',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' } 
        },

        localizedString('location', 'Nơi sống'),
        localizedString('status', 'Trạng thái'),
        
        // Yêu cầu 4: Ngôn ngữ
        {
            name: 'languages',
            title: 'Ngôn ngữ',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    localizedString('lang', 'Tên ngôn ngữ'),
                    { name: 'isNative', title: 'Là tiếng mẹ đẻ?', type: 'boolean', initialValue: false },
                    localizedString('level', 'Trình độ (Vd: IELTS 7.0, N2...)')
                ],
                preview: {
                    select: { title: 'lang.en', subtitle: 'level.en', isNative: 'isNative' },
                    prepare({ title, subtitle, isNative }) {
                        return { title: `${title} ${isNative ? '(Native)' : ''}`, subtitle }
                    }
                }
            }]
        },
        // Thêm quốc tịch nếu thích
        localizedString('nationality', 'Quốc tịch'),
      ]
    }),

    // --- 2. MAIN SECTIONS ---
    defineField({
      name: 'sections',
      title: 'Nội dung chính',
      type: 'array',
      of: [
        // BLOCK TEXT + ẢNH
        {
          type: 'object',
          name: 'contentBlock',
          title: 'Đoạn văn & Ảnh',
          icon: AlignLeft as any,
          fields: [
            localizedString('heading', 'Tiêu đề mục'),
            // Yêu cầu 6: Dùng Rich Text thay vì Text thường
            localizedBlock('content', 'Nội dung chi tiết'),
            
            {
              name: 'image',
              title: 'Hình ảnh minh họa',
              type: 'image',
              options: { hotspot: true }, // Cho phép crop
            },
            {
                name: 'imagePosition',
                title: 'Vị trí ảnh',
                type: 'string',
                options: {
                    list: [
                        { title: 'Trái (Chữ bao quanh)', value: 'left' },
                        { title: 'Phải (Chữ bao quanh)', value: 'right' },
                        { title: 'Giữa (Ảnh to vừa phải)', value: 'center' }
                    ],
                    layout: 'radio'
                },
                initialValue: 'right'
            },
            localizedString('imageCaption', 'Chú thích ảnh'),
          ]
        },

        // BLOCK TIMELINE
        {
          type: 'object',
          name: 'timelineBlock',
          title: 'Timeline (Kinh nghiệm)',
          icon: Clock as any,
          fields: [
            localizedString('heading', 'Tiêu đề'),
            {
              name: 'items',
              title: 'Các mốc thời gian',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  // Yêu cầu 5: Thời gian tháng/năm
                  { 
                      name: 'timePeriod', 
                      title: 'Thời gian (Vd: 01/2023 - Present)', 
                      type: 'string' 
                  },
                  localizedString('role', 'Chức vụ / Ngành học'),
                  localizedString('company', 'Công ty / Trường học'),
                  // Đã bỏ description theo yêu cầu
                ],
                preview: {
                    select: { title: 'company.en', subtitle: 'role.en', time: 'timePeriod' },
                    prepare({ title, subtitle, time }) {
                        return { title: `${time}: ${title}`, subtitle }
                    }
                }
              }]
            }
          ]
        },

        // BLOCK SKILLS (TICK LIST)
        {
            type: 'object',
            name: 'skillsBlock',
            title: 'Kỹ năng (Phân loại)',
            icon: CheckSquare as any,
            fields: [
                localizedString('heading', 'Tiêu đề (Vd: Tech Stack)'),
                
                // 1. Ngôn ngữ lập trình
                {
                    name: 'pl', // Programming Languages
                    title: 'Ngôn ngữ lập trình',
                    description: 'Vd: Java, TypeScript, Python...',
                    type: 'array',
                    of: [{ type: 'string' }],
                    options: { layout: 'tags' }
                },

                // 2. Frameworks & Libraries
                {
                    name: 'frameworks',
                    title: 'Frameworks & Libraries',
                    description: 'Vd: Spring Boot, Next.js, React...',
                    type: 'array',
                    of: [{ type: 'string' }],
                    options: { layout: 'tags' }
                },

                // 3. Database & Cloud
                {
                    name: 'databases',
                    title: 'Database & Cloud',
                    description: 'Vd: PostgreSQL, MySQL, AWS, Firebase...',
                    type: 'array',
                    of: [{ type: 'string' }],
                    options: { layout: 'tags' }
                },

                // 4. Tools & Others
                {
                    name: 'tools',
                    title: 'Công cụ & Khác',
                    description: 'Vd: Git, Docker, Postman, Figma...',
                    type: 'array',
                    of: [{ type: 'string' }],
                    options: { layout: 'tags' }
                }
            ],
            preview: {
                select: { title: 'heading.en' },
                prepare({ title }) {
                  return { title: `🛠 Skills: ${title || 'Tech Stack'}` }
                }
            }
        }
      ]
    }),
  ],
})