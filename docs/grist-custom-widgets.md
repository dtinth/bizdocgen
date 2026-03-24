# Grist Custom Widgets Development Guide

## Core Integration

### Plugin API Setup

```html
<script src="https://docs.getgrist.com/grist-plugin-api.js"></script>
```

### Basic Widget Initialization

```javascript
grist.ready({
  // Configuration options
})
```

## Access Levels

Three security levels available:

- **No document access**: Widget operates independently
- **Read selected table**: Access to current table data
- **Full document access**: Complete document access

## Column Mapping Configuration

Define column requirements with full specification:

```javascript
grist.ready({
  columns: [
    {
      name: 'columnId',
      title: 'Display Name',
      optional: false,
      type: 'Text|Numeric|Int|Bool|Date|DateTime|Choice|ChoiceList|Ref|RefList',
      description: 'Purpose description',
      allowMultiple: false,
    },
  ],
})
```

### Column Types

- `Text`, `Numeric`, `Int`, `Bool`
- `Date`, `DateTime`
- `Choice`, `ChoiceList`
- `Ref`, `RefList` (references)

## API Methods

### Lifecycle Events

```javascript
grist.onRecord(callback) // Single record updates
grist.onRecords(callback) // Multiple records
grist.onOptions(callback) // Widget options changes
```

### Options Management

```javascript
grist.setOption(key, value)
grist.getOption(key)
grist.clearOptions()
```

### Widget Linking

Enable as linking source:

```javascript
grist.ready({
  allowSelectBy: true,
})

// Set cursor position
grist.setCursorPos({ rowId: id })
```

### Data Access

```javascript
// Get current record
grist.onRecord((record) => {
  const value = record.columnName
})

// Get multiple records
grist.onRecords((records) => {
  records.forEach((record) => {
    // Process each record
  })
})
```

## Utility Functions

### Column Name Mapping

```javascript
function mapColumnNames(record, mappings) {
  const result = {}
  Object.entries(mappings).forEach(([key, colId]) => {
    result[key] = record[colId]
  })
  return result
}
```

### Safe Value Access

```javascript
function getColumnValue(record, columnId, defaultValue = null) {
  return record.hasOwnProperty(columnId) ? record[columnId] : defaultValue
}
```

## TypeScript Definitions

```typescript
interface GristAPI {
  ready(options?: WidgetOptions): void
  onRecord(callback: (record: Record<string, any>) => void): void
  onRecords(callback: (records: Record<string, any>[]) => void): void
  onOptions(callback: (options: any) => void): void
  setOption(key: string, value: any): void
  getOption(key: string): any
  clearOptions(): void
  setCursorPos(pos: { rowId: number }): void
}

interface WidgetOptions {
  columns?: ColumnConfig[]
  allowSelectBy?: boolean
}

interface ColumnConfig {
  name: string
  title?: string
  optional?: boolean
  type?: string
  description?: string
  allowMultiple?: boolean
}
```

## Development Best Practices

### Error Handling

```javascript
grist.ready().catch((err) => {
  console.error('Grist initialization failed:', err)
  // Fallback behavior
})
```

### Standalone Mode Detection

```javascript
if (typeof grist === 'undefined' || !window.grist) {
  // Handle standalone mode
  console.log('Running in standalone mode')
}
```

### Async Data Processing

```javascript
grist.onRecords(async (records) => {
  try {
    const processedData = await processRecords(records)
    updateUI(processedData)
  } catch (error) {
    handleError(error)
  }
})
```

## Common Patterns

### Multi-Column Widget

```javascript
grist.ready({
  columns: [
    { name: 'title', title: 'Title', type: 'Text' },
    { name: 'value', title: 'Value', type: 'Numeric' },
    { name: 'category', title: 'Category', type: 'Choice', optional: true },
  ],
})

grist.onRecord((record) => {
  const data = mapColumnNames(record, {
    title: record.title,
    value: record.value,
    category: record.category || 'Default',
  })
  renderWidget(data)
})
```

### Interactive Widget with Linking

```javascript
grist.ready({
  allowSelectBy: true,
  columns: [{ name: 'id', title: 'ID', type: 'Int' }],
})

function selectRow(rowId) {
  grist.setCursorPos({ rowId: rowId })
}
```

## Security Considerations

- Validate external data sources
- Sanitize user inputs
- Use minimal required access level
- Implement proper error boundaries
- Handle CORS restrictions for external resources

## Testing Strategies

### Standalone Testing

```javascript
// Mock Grist API for development
if (!window.grist) {
  window.grist = {
    ready: () => Promise.resolve(),
    onRecord: (cb) => cb(mockRecord),
    setOption: () => {},
    getOption: () => null,
  }
}
```

### Column Mapping Validation

```javascript
function validateColumnMapping(record, requiredColumns) {
  return requiredColumns.every((col) => col.optional || record.hasOwnProperty(col.name))
}
```
