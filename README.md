# effect-schema-maxlength-repro

Minimal reproduction for a string-length semantic mismatch:

- JSON Schema `maxLength` is defined in terms of Unicode code points.
- AJV accepts `"💩"` for `{ "type": "string", "maxLength": 1 }`.
- `Schema.String.pipe(Schema.maxLength(1))` rejects `"💩"` because the runtime validation appears to count UTF-16 code units.
- `effect/JSONSchema` emits JSON Schema `maxLength: 1` for the same Effect schema, so the generated JSON Schema has different validation behavior from the source schema.

Run:

```sh
npm install
npm run repro
```

Expected output includes:

```text
String.prototype.length / UTF-16 code units: 2
Array.from(input).length / Unicode code points: 1
AJV validates generated JSON Schema: true
Effect Schema validates original schema: false
```
