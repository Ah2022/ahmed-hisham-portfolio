import test from "node:test";
import assert from "node:assert/strict";
import {
  detectClashes,
  initialElements,
  resolvedLayout,
  issueMarkup,
  zipTextFiles,
} from "../client/src/lib/clashSimulation";

test("initial service zone has four unique clashes and two structure priorities", () => {
  const clashes = detectClashes(initialElements);
  assert.equal(clashes.length, 4);
  assert.equal(new Set(clashes.map(c => c.key)).size, 4);
  assert.equal(clashes.filter(c => c.severity === "High").length, 2);
});
test("plan overlap alone is insufficient when elevations are separated", () => {
  const [pipe, duct] = initialElements;
  assert.equal(detectClashes([pipe, duct]).length, 1);
  assert.equal(
    detectClashes([
      pipe,
      { ...duct, z: pipe.z + (pipe.depth + duct.depth) / 2 },
    ]).length,
    0
  );
});
test("touching plan boundaries are not hard intersections", () => {
  const [pipe, duct] = initialElements;
  assert.equal(
    detectClashes([pipe, { ...duct, x: pipe.x + pipe.width }]).length,
    0
  );
});
test("demonstration resolution clears the envelopes without moving structure", () => {
  const result = resolvedLayout(initialElements);
  assert.equal(detectClashes(result).length, 0);
  assert.deepEqual(
    result.find(e => e.kind === "beam"),
    initialElements.find(e => e.kind === "beam")
  );
  assert.equal(detectClashes(initialElements).length, 4);
});
test("BCF topics escape XML and encode the live issue status", () => {
  const issue = {
    guid: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
    key: "test",
    title: "Pipe & duct <review>",
    severity: "Medium",
    createdAt: "2026-10-05T12:00:00.000Z",
    elements: initialElements.slice(0, 2),
  };
  const xml = issueMarkup(issue, false);
  assert(xml.includes('TopicStatus="Resolved"'));
  assert(xml.includes("Pipe &amp; duct &lt;review&gt;"));
  assert(issueMarkup(issue, true).includes('TopicStatus="Open"'));
  const zip = zipTextFiles([{ name: "bcf.version", content: "BCF" }]);
  assert.equal(new DataView(zip.buffer).getUint32(0, true), 0x04034b50);
  assert.equal(
    new DataView(zip.buffer).getUint32(zip.length - 22, true),
    0x06054b50
  );
});
