export interface NextStep {
    cpf?: string,
    value?: any,
    input?: any,
    token?: string,
    document?: string,
    workflow_type?: number,
    version?: number,
}

export interface NextStepResponse {
    currentStep: 0,
    workflowStepType: string,
    token: string,
    data?: any
}