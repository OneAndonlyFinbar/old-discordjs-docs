import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import { BsCodeSlash } from 'react-icons/bs';
import { populateLinks } from '@/lib/utils/PopulateLinks';

export default function Header({ data, hiddenParamsVisible, setHiddenParamsVisible, classes, typedefs, pkg, branch }: {
  data: any,
  hiddenParamsVisible: boolean,
  setHiddenParamsVisible: any,
  classes: any,
  typedefs: any,
  pkg: string,
  branch: string
}) {
  return (
    <div>
      <div className="docs-contents-header">
        <h1>{data.name}</h1>
        <div className="flex flex-row items-center gap-x-2">
          {hiddenParamsVisible ? (
            <AiOutlineEyeInvisible className="text-red-500 cursor-pointer mr-2" onClick={() => setHiddenParamsVisible(false)} title="Hidden attributes are not shown. Click to show."/>
          ) : (
            <AiOutlineEye className="cursor-pointer mr-2" onClick={() => setHiddenParamsVisible(true)} title="Hidden attributes are shown. Click to hide."/>
          )}
          <Link href={data.meta?.url || `https://github.com/discordjs/${pkg}/tree/${branch}/${data.meta.path}/${data.meta.file}#L${data.meta.line}`} target="_blank"><BsCodeSlash className="text-blue-400 cursor-pointer mr-2"/></Link>
        </div>
      </div>
      {(data.extends || data.implements) && (
        <div className="docs-contents-subheader">
          {data?.extends && (
            <p>Extends <span dangerouslySetInnerHTML={{ __html: populateLinks(data.extends[0][0][0], classes, typedefs, pkg, branch) }}></span>
            </p>
          )}
          &nbsp;
          {data?.implements && (
            <p>Implements <span dangerouslySetInnerHTML={{ __html: populateLinks(data.implements[0][0][0], classes, typedefs, pkg, branch) }}></span>
            </p>
          )}
        </div>
      )}
      <p className="docs-contents-description" dangerouslySetInnerHTML={{ __html: populateLinks(data.description || 'No description.', classes, typedefs, pkg, branch) }}></p>
    </div>
  );
}