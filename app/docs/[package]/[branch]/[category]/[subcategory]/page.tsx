'use client';
import Navbar from '@/components/Navbar';
import DocsNavbar from '@/components/docs/DocsNavbar';
import { useEffect, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import DocsSidebar from '@/components/docs/DocsSidebar';
import Header from '@/components/docs/Header';
import Constructor from '@/components/docs/Constructor';
import Types from '@/components/docs/Types';
import ShortLists from '@/components/docs/ShortLists';
import DetailedPropertiesList from '@/components/docs/Detailed/DetailedPropertiesList';
import DetailedMethodsList from '@/components/docs/Detailed/DetailedMethodsList';
import DetailedEventsList from '@/components/docs/Detailed/DetailedEventsList';
import FunctionParams from '@/components/docs/FunctionParams';
import FunctionReturns from '@/components/docs/FunctionReturns';

hljs.registerLanguage('javascript', javascript);

export default function Documentation({ params }: {
  params: {
    [slug: string]: any
  }
}) {
  const { package: pkg, branch, category, subcategory } = params;
  const [data, setData] = useState<null | any>(null);

  const [classes, setClasses] = useState<null | any>(null);
  const [typedefs, setTypedefs] = useState<null | any>(null);
  const [functions, setFunctions] = useState<null | any>(null);
  const [hiddenParamsVisible, setHiddenParamsVisible] = useState<boolean>(true);

  const [packages, setPackages] = useState<Array<string>>(['discord.js']);
  const [versions, setVersions] = useState<Array<string>>(['main']);

  const updateVersions = async () => {
    fetch(`https://api.github.com/repos/discordjs/docs/contents/${pkg}`, {
      next: {
        revalidate: 3600
      }
    })
      .then(res => res.json())
      .then(res => {
        setVersions(res.map((version: any) => version.name.substring(0, version.name.length - 5)).sort((a: string, b: string) => {
          if (a === 'main') return -1;
          if (b === 'main') return 1;
          return a.localeCompare(b);
        }));
      });
  }

  useEffect(() => {
    fetch(`https://api.github.com/repos/discordjs/docs/contents/`, {
      next: {
        revalidate: 3600
      }
    })
      .then(res => res.json())
      .then(res => {
        setPackages(res.filter((repo: any) => repo.type === 'dir' && !repo.name.startsWith('.')).map((repo: any) => repo.name).sort((a: string, b: string) => {
          if (a === 'discord.js') return -1;
          if (b === 'discord.js') return 1;
          return a.localeCompare(b);
        }))
      });
  }, [pkg, branch]);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/discordjs/docs/main/${pkg}/${branch}.json`, {
      next: {
        revalidate: 60
      }
    })
      .then(res => res.json())
      .then(res => {
        setClasses(res.classes);
        setTypedefs(res.typedefs);
        setFunctions(res.functions);

        if (category === 'class') {
          setData(res.classes.find((cls: any) => cls.name === subcategory));
          console.log(res.classes.find((cls: any) => cls.name === subcategory));
        } else if (category === 'typedef') {
          setData(res.typedefs.find((typedef: any) => typedef.name === subcategory));
          console.log(res.typedefs.find((typedef: any) => typedef.name === subcategory));
        } else if (category === 'function') {
          setData(res.functions.find((func: any) => func.name === subcategory));
          console.log(res.functions.find((func: any) => func.name === subcategory));
        }

        updateVersions();
      });
  }, [pkg, branch, category, subcategory]);

  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [data]);

  return (
    <div>
      <Navbar/>
      <DocsNavbar packages={packages} versions={versions} activePkg={pkg} activeVersion={branch}/>
      <div className="docs-main">
        <DocsSidebar classes={classes} typedefs={typedefs} functions={functions} category={category} subcategory={subcategory} pkg={pkg} branch={branch}/>
        {data && (
          <div className="docs-contents">
            <Header data={data} hiddenParamsVisible={hiddenParamsVisible} setHiddenParamsVisible={setHiddenParamsVisible} classes={classes} typedefs={typedefs} pkg={pkg} branch={branch}/>

            {category === 'function'
              ? (
                <div>
                  <FunctionParams data={data} classes={classes} typedefs={typedefs} pkg={pkg} branch={branch}/>
                  <FunctionReturns data={data} classes={classes} typedefs={typedefs} pkg={pkg} branch={branch}/>
                </div>
              )
              : <Constructor data={data} classes={classes} typedefs={typedefs} pkg={pkg} branch={branch}/>
            }
            <Types data={data}/>
            <ShortLists data={data} hiddenParamsVisible={hiddenParamsVisible}/>
            <DetailedPropertiesList data={data} hiddenParamsVisible={hiddenParamsVisible} classes={classes} typedefs={typedefs} pkg={pkg} branch={branch}/>
            <DetailedMethodsList data={data} hiddenParamsVisible={hiddenParamsVisible} classes={classes} typedefs={typedefs} pkg={pkg} branch={branch}/>
            <DetailedEventsList data={data} hiddenParamsVisible={hiddenParamsVisible} classes={classes} typedefs={typedefs} pkg={pkg} branch={branch}/>
          </div>
        )}
      </div>
    </div>
  );
}