function RenderFieldRecursive({ value }: { value: any }) {
  if (Array.isArray(value)) {
    return (
      <div>
        {value.map((item, index) => (
          <div key={index}>
            <RenderFieldRecursive value={item} />
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === 'object' && value !== null) {
    return (
      <div className='inner-objects'>
        {Object.entries(value).map(([key, value]) => {
          return (
            <div key={key}>
              <strong>{key}</strong>: <RenderFieldRecursive value={value} />
            </div>
          );
        })}
      </div>
    );
  }

  return <span>{String(value)}</span>;
}

export default RenderFieldRecursive;
