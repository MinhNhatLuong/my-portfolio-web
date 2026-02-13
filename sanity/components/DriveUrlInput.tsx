import { useCallback } from 'react'
import { StringInputProps, set, unset } from 'sanity'
import { Stack, Text, TextInput, Card, Label } from '@sanity/ui'

export function DriveUrlInput(props: StringInputProps) {
  const { onChange, value = '', elementProps } = props

  // Hàm trích xuất ID từ Link Google Drive
  const extractDriveId = (input: string) => {
    // Các dạng link thường gặp:
    // 1. https://drive.google.com/drive/folders/1A2B3C...
    // 2. https://drive.google.com/drive/u/0/folders/1A2B3C...
    // 3. https://drive.google.com/open?id=1A2B3C...
    
    // Regex tìm chuỗi sau 'folders/' hoặc 'id='
    const regex = /(?:folders\/|id=)([\w-]+)/
    const match = input.match(regex)
    
    return match ? match[1] : input // Nếu không khớp thì giữ nguyên (trường hợp user paste ID trực tiếp)
  }

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.currentTarget.value
      const driveId = extractDriveId(inputValue)

      // Cập nhật giá trị vào Sanity (Nếu rỗng thì unset, có thì set)
      onChange(driveId ? set(driveId) : unset())
    },
    [onChange]
  )

  return (
    <Stack space={3}>
      <Stack space={2}>
        <Label>Google Drive Folder ID (hoặc Link)</Label>
        <Text size={1} muted>
          Bạn có thể paste toàn bộ link folder, hệ thống sẽ tự tách lấy ID.
        </Text>
      </Stack>
      
      <TextInput
        {...elementProps}
        onChange={handleChange}
        value={value}
        placeholder="Paste link Google Drive folder vào đây..."
      />

      {/* Hiển thị ID đã tách để user yên tâm */}
      {value && value.length > 20 && !value.includes('/') && (
        <Card padding={3} radius={2} tone="positive" style={{border: '1px dashed green'}}>
          <Text size={1} weight="medium" style={{color: 'green'}}>
            ✅ Đã trích xuất ID: {value}
          </Text>
        </Card>
      )}
    </Stack>
  )
}