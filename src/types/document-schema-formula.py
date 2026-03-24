def serialize_client(client):
    return {
        "Address": client.Address,
        "Name": client.Name,
        "Tax_ID": client.Tax_ID,
    }

def serialize_provider(provider):
    return {
        "Address": provider.Address,
        "Email": provider.Email or None,
        "Name": provider.Name,
        "Personnel_Name": provider.Personnel_Name or None,
        "Tax_ID": provider.Tax_ID,
    }

def serialize_item(item):
    return {
        "Description": item.Description,
        "Manual_Sort": item.Manual_Sort or None,
        "Quantity": item.Quantity,
        "Total": item.Total,
        "Unit_Price": item.Unit_Price,
        "id": item.id,
    }

def serialize_payment_method(pm):
    if not pm:
        return None
    return {
        "Account_Holder": pm.Account_Holder or None,
        "Account_Number": pm.Account_Number or None,
        "Bank": pm.Bank or None,
        "Branch": pm.Branch or None,
        "Name": pm.Name,
        "PromptPay": pm.PromptPay or None,
    }

def serialize_reference(ref):
    if not ref:
        return None
    return {
        "Number": ref.Number,
    }

def serialize_record(doc):
    return {
        "Client": serialize_client(doc.Client),
        "Credit_Term": doc.Credit_Term or None,
        "Date": str(doc.Date) if doc.Date else "",
        "Document_Type": doc.Document_Type,
        "Items": [serialize_item(item) for item in doc.Items],
        "Number": doc.Number,
        "Payment_Method": serialize_payment_method(doc.Payment_Method),
        "Provider": serialize_provider(doc.Provider),
        "Reference": serialize_reference(doc.Reference),
        "Remarks": doc.Remarks or None,
        "Signed_Document_URL": doc.Signed_Document_URL or None,
        "Tax": doc.Tax,
    }