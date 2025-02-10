'use client';

export function FontTest() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Font Test</h2>
      
      <div className="space-y-2">
        <p className="font-bold text-xl">
          This text is in Inter Bold
        </p>
        <p className="font-thin text-xl">
          This text is in Inter Thin
        </p>
      </div>
    </div>
  );
} 