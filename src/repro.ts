import { Ajv } from "ajv"
import * as JSONSchema from "effect/JSONSchema"
import * as Schema from "effect/Schema"

const schema = Schema.String.pipe(Schema.maxLength(1))
const jsonSchema = JSONSchema.make(schema)
const validateJsonSchema = new Ajv().compile(jsonSchema)

const value = "💩"

console.log("input:", value)
console.log("String.prototype.length / UTF-16 code units:", value.length)
console.log("Array.from(input).length / Unicode code points:", Array.from(value).length)
console.log("Generated JSON Schema:", JSON.stringify(jsonSchema, null, 2))
console.log("AJV validates generated JSON Schema:", validateJsonSchema(value))
console.log("Effect Schema validates original schema:", Schema.is(schema)(value))

if (validateJsonSchema(value) !== true) {
  throw new Error("Expected AJV to accept the value because JSON Schema maxLength counts code points")
}

if (Schema.is(schema)(value) !== false) {
  throw new Error("Expected Effect Schema to reject the value because it appears to count UTF-16 code units")
}
