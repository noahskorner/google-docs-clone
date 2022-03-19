import Component from '../component';
import Variant from '../variant';
import Table from '../../atoms/table';

const Tables = () => {
  return (
    <Component header="Tables">
      <Variant header="Basic Table">
        <Table />
      </Variant>
    </Component>
  );
};

export default Tables;
