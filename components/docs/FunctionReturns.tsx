import { populateLinks } from '@/lib/utils/PopulateLinks';

export default function FunctionReturns({ data, classes, typedefs, pkg, branch }: {
  data: any,
  classes: any,
  typedefs: any,
  pkg: string,
  branch: string
}) {
  return (
    <div>
      <strong>Returns: </strong><span dangerouslySetInnerHTML={{ __html: populateLinks((data.returns[0]?.types ? data.returns[0].types : data.returns[0][0]).join('').replaceAll(',', ''), classes, typedefs, pkg, branch) }}></span>
    </div>
  );
}