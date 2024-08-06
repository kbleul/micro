  const appendAsterisk = (label: string, isRequired: boolean) => {
    return isRequired ? (
      <>
        {label}
        <span style={{ color: 'red' }}> *</span>
      </>
    ) : (
      label
    );
  };

  export default appendAsterisk