import Layout from '../../components/templates/layout';
import Buttons from '../../components/molecules/buttons';
import Selects from '../../components/molecules/selects';
import TextField from '../../components/molecules/text-fields';
import Toasts from '../../components/molecules/toasts';
import Tables from '../../components/molecules/tables';

const Components = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <Buttons />
        <TextField />
        <Selects />
        <Toasts />
        <Tables />
      </div>
    </Layout>
  );
};

export default Components;
