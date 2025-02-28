import {
    Button,
    Card,
    CardBody,
    Divider,
    Popover,
    ProgressStep,
    ProgressStepper,
    ProgressStepProps,
    Split,
    SplitItem
} from '@patternfly/react-core';
import { ExternalLinkSquareAltIcon, HelpIcon, InProgressIcon } from '@patternfly/react-icons';
import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import React, { useState } from 'react';

import { Messages } from '../../../properties/Messages';
import { SplunkSetupFinished } from './SplunkSetupFinished';
import { SplunkSetupForm } from './SplunkSetupForm';

const SplunkSetupTitle: React.FunctionComponent = () => (
    <>
        <PageHeaderTitle title={ <>
            { Messages.pages.splunk.page.title }
            <Popover
                bodyContent={ Messages.pages.splunk.page.help }
                footerContent={ Messages.pages.splunk.page.helpUrl &&
                            <a target="_blank" rel="noopener noreferrer" href={ Messages.pages.splunk.page.helpUrl || '' }>
                                Learn more <ExternalLinkSquareAltIcon />
                            </a> }
            >
                <Button
                    variant='plain'
                    aria-label="Help description"
                    className="title-help-label"
                >
                    <HelpIcon noVerticalAlign />
                </Button>
            </Popover>
        </> } />
        { Messages.pages.splunk.page.description }
    </>
);

export const SplunkSetupPage: React.FunctionComponent = () => {

    const [ step, setStep ] = useState(2);
    const [ stepIsInProgress, setStepIsInProgress ] = useState(false);
    const [ stepVariant, setStepVariant ] = useState<ProgressStepProps['variant']>('info');

    const [ hecToken, setHecToken ] = useState('');
    const [ splunkServerHostName, setHostName ] = useState('');
    const [ automationLogs, setAutomationLogs ] = useState<React.ReactChild[]>([ `Logs from the automation would appear here\n` ]);

    return (
        <>
            <PageHeader>
                <SplunkSetupTitle />
            </PageHeader>
            <Main>
                <Card>
                    <CardBody>
                        <Split hasGutter>
                            <SplitItem>
                                <ProgressStepper isVertical>
                                    <ProgressStep
                                        isCurrent={ step === 1 }
                                        variant="success"
                                        description="Create HEC"
                                        id="step1-splunk-app-step"
                                        titleId="step1-splunk-app-step"
                                        aria-label="completed Splunk app step (step 1)"
                                    >
                                        Step 1 (Splunk app)
                                    </ProgressStep>
                                    <ProgressStep
                                        isCurrent={ step === 2 }
                                        icon={ step === 2 && stepIsInProgress ? <InProgressIcon /> : undefined }
                                        variant={ step < 2 ? 'info' : (step > 2 ? 'success' : stepVariant) }
                                        description="Configure Splunk integration in Insights"
                                        id="step2-setup-step"
                                        titleId="step2-setup-step"
                                        aria-label="setup step (step 2)"
                                    >
                                        Step 2
                                    </ProgressStep>
                                    <ProgressStep
                                        isCurrent={ step === 3 }
                                        variant={ step < 3 ? 'pending' : 'success' }
                                        description="Review"
                                        id="step3-review-step"
                                        titleId="step3-review-step"
                                        aria-label="review step (step 3)"
                                    >
                                        Step 3
                                    </ProgressStep>
                                </ProgressStepper>
                            </SplitItem>
                            <Divider isVertical />
                            <SplitItem isFilled>
                                { step === 2
                                    && <SplunkSetupForm { ...{ setStep, stepIsInProgress, setStepIsInProgress, stepVariant, setStepVariant,
                                        hecToken, setHecToken, splunkServerHostName, setHostName,
                                        automationLogs, setAutomationLogs
                                    } } /> }
                                { step === 3 && <SplunkSetupFinished setStep={ setStep } /> }
                            </SplitItem>
                        </Split>
                    </CardBody>
                </Card>
            </Main>
        </>
    );
};
