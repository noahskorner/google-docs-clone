import Button from '../../atoms/button';
import Component from '../component';
import Variant from '../variant';

const Buttons = () => {
  return (
    <Component header="Buttons">
      <Variant header="Sizes">
        <Button size="sm" children={'Small'} />
        <Button size="md" children={'Medium'} />
        <Button size="lg" children={'Large'} />
      </Variant>
      <Variant header="Colors">
        <Button size="md" children={'Primary'} color="primary" />
        <Button size="md" children={'Secondary'} color="secondary" />
        <Button size="md" children={'Success'} color="success" />
        <Button size="md" children={'Warning'} color="warning" />
        <Button size="md" children={'Danger'} color="danger" />
      </Variant>
      <Variant header="Disabled">
        <Button size="md" children={'Primary'} disabled color="primary" />
        <Button size="md" children={'Secondary'} disabled color="secondary" />
        <Button size="md" children={'Success'} disabled color="success" />
        <Button size="md" children={'Warning'} disabled color="warning" />
        <Button size="md" children={'Danger'} disabled color="danger" />
      </Variant>
      <Variant header="Loading">
        <Button size="sm" children={'Small'} loading />
        <Button size="md" children={'Medium'} loading />
        <Button size="lg" children={'Large'} loading />
      </Variant>
      <Variant header="Block">
        <Button size="sm" children={'Small'} block />
        <Button size="md" children={'Medium'} block />
        <Button size="lg" children={'Large'} block />
      </Variant>
    </Component>
  );
};

export default Buttons;
