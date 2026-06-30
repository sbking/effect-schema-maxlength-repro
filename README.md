# effect-schema-maxlength-repro

Minimal reproduction for a string-length semantic mismatch in Effect v4 / effect-smol:

- JSON Schema `maxLength` is defined in terms of Unicode code points.
- AJV accepts `"💩"` for `{ "type": "string", "maxLength": 1 }`.
- `Schema.String.check(Schema.isMaxLength(1))` rejects `"💩"` because the runtime validation appears to count UTF-16 code units.
- `Schema.toJsonSchemaDocument(...)` emits JSON Schema `maxLength: 1` for the same Effect schema, so the generated JSON Schema has different validation behavior from the source schema.

Run:

```sh
npm install
npm run repro
```

Version choices are intentional, current for their relevant npm dist-tags when this repro was created, and pinned exactly:

- `effect@4.0.0-beta.92`: the current Effect v4 / effect-smol beta line used for this repro.
- `ajv@8.20.0`: the current AJV latest release and the JSON Schema validator used as the comparison point.
- `tsx@4.22.4`: the current tsx latest release; it runs the TypeScript repro without a build step.
- `typescript@6.0.3`: the current TypeScript latest release; it typechecks the repro under the checked-in `tsconfig.json`.

Expected output includes:

```text
String.prototype.length / UTF-16 code units: 2
Array.from(input).length / Unicode code points: 1
AJV validates generated JSON Schema: true
Effect Schema validates original schema: false
```
