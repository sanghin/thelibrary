import React, { KeyboardEvent, ChangeEvent, useState } from 'react';

export default () => {
  const [value, setInputValue] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && !submitting) {
      setSubmitting(true);

      await fetch('/api/pastebin', { method: 'POST', body: `${value}` });

      setSubmitting(false);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <div>
      <label htmlFor="pastebinLink" className="label">
        Import pastebin
        <input id="pastebinLink" className="input" type="text" name="name" onKeyDown={onKeyDown} onChange={onChange} />
      </label>
    </div>
  );
};
